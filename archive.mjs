// Supplemental local snapshots. Known recovery payloads load only when requested.
export function createPhoneArchive({ indexedDB, databaseName = 'mochi-phone-state-v1', timeout = 3000, setTimer = globalThis.setTimeout, clearTimer = globalThis.clearTimeout, deferRecord = () => false } = {}) {
    const cache = new Map(), keys = new Set(), pending = new Set();
    let db = null, opening = null, closed = false, closing = null, epoch = 0;
    function track(job) { pending.add(job); job.finally(() => pending.delete(job)); return job; }
    function open() {
        if (closed) return closing.then(() => { closed = false; return open(); });
        if (opening) return opening;
        if (db) return Promise.resolve(true);
        if (!indexedDB) return Promise.resolve(false);
        let connection = null;
        const serial = epoch;
        opening = new Promise(resolve => {
            let finished = false;
            const timer = setTimer(() => finish(false), timeout);
            function finish(ok) {
                if (finished) return;
                finished = true; clearTimer(timer);
                ok = ok && serial === epoch && !closed;
                if (!ok) { connection?.close(); if (db === connection) db = null; if (serial === epoch) { cache.clear(); keys.clear(); } }
                resolve(ok);
            }
            try {
                const request = indexedDB.open(databaseName, 1);
                request.onupgradeneeded = () => {
                    if (!request.result.objectStoreNames.contains('states')) request.result.createObjectStore('states');
                };
                request.onerror = request.onblocked = () => finish(false);
                request.onsuccess = () => {
                    connection = request.result;
                    if (finished || closed || serial !== epoch) { connection.close(); finish(false); return; }
                    db = connection;
                    db.onversionchange = () => {
                        connection.close();
                        if (db === connection) { epoch++; db = null; opening = null; cache.clear(); keys.clear(); }
                    };
                    let tx;
                    try { tx = db.transaction('states', 'readonly'); } catch { finish(false); return; }
                    const store = tx.objectStore('states');
                    // A key cursor avoids cloning deferred backup/journal values at startup.
                    const cursor = store.openKeyCursor();
                    cursor.onsuccess = () => {
                        const entry = cursor.result;
                        if (!entry || serial !== epoch || closed) return;
                        const key = String(entry.key); keys.add(key);
                        if (!deferRecord(key)) {
                            const read = store.get(entry.key);
                            read.onsuccess = () => { if (serial === epoch && !closed) cache.set(key, read.result); };
                        }
                        entry.continue();
                    };
                    tx.oncomplete = () => finish(true);
                    tx.onerror = tx.onabort = () => finish(false);
                };
            } catch { finish(false); }
        });
        const attempt = opening;
        attempt.then(ok => { if (!ok && opening === attempt) opening = null; });
        return opening;
    }
    function get(key) { return cache.get(String(key)) || null; }
    function put(key, value) {
        if (closed) return Promise.resolve(false);
        const serial = epoch;
        let snapshot;
        try { snapshot = JSON.parse(JSON.stringify(value)); } catch { return Promise.resolve(false); }
        return track((async () => {
            if (!db && !await open()) return false;
            if (closed || serial !== epoch) return false;
            return new Promise(resolve => {
                try {
                    const tx = db.transaction('states', 'readwrite');
                    tx.objectStore('states').put(snapshot, String(key));
                    tx.oncomplete = () => { if (serial === epoch && !closed) { cache.set(String(key), snapshot); keys.add(String(key)); } resolve(true); };
                    tx.onerror = tx.onabort = () => resolve(false);
                } catch { resolve(false); }
            });
        })());
    }
    function load(key) {
        if (closed) return Promise.resolve(false);
        key = String(key);
        if (cache.has(key)) return Promise.resolve(true);
        const serial = epoch;
        return track((async () => {
            if (!db && !await open()) return false;
            if (closed || serial !== epoch) return false;
            return new Promise(resolve => {
                let value;
                try {
                    const tx = db.transaction('states', 'readonly'), request = tx.objectStore('states').get(key);
                    request.onsuccess = () => { value = request.result; };
                    tx.oncomplete = () => {
                        if (closed || serial !== epoch) { resolve(false); return; }
                        if (value !== undefined) { cache.set(key, value); keys.add(key); }
                        resolve(value !== undefined);
                    };
                    tx.onerror = tx.onabort = () => resolve(false);
                } catch { resolve(false); }
            });
        })());
    }
    function loadPrefix(prefix) {
        if (closed) return Promise.resolve(false);
        prefix = String(prefix); const serial = epoch;
        return track((async () => {
            if (!db && !await open()) return false;
            if (closed || serial !== epoch) return false;
            return new Promise(resolve => {
                const values = new Map();
                try {
                    const tx = db.transaction('states', 'readonly'), store = tx.objectStore('states'), cursor = store.openKeyCursor();
                    cursor.onsuccess = () => {
                        const entry = cursor.result;
                        if (!entry || serial !== epoch || closed) return;
                        const key = String(entry.key); keys.add(key);
                        if (key.startsWith(prefix) && !cache.has(key)) {
                            const request = store.get(entry.key); request.onsuccess = () => values.set(key, request.result);
                        }
                        entry.continue();
                    };
                    tx.oncomplete = () => {
                        if (closed || serial !== epoch) { resolve(false); return; }
                        for (const [key, value] of values) if (!cache.has(key)) cache.set(key, value);
                        resolve(true);
                    };
                    tx.onerror = tx.onabort = () => resolve(false);
                } catch { resolve(false); }
            });
        })());
    }
    async function read(key) { await load(key); return get(key); }
    async function drain() { while (pending.size) await Promise.all([...pending]); }
    function close() {
        if (closed) return closing;
        closed = true; epoch++; opening = null;
        const connection = db; db = null;
        closing = (async () => { await drain(); connection?.close(); cache.clear(); keys.clear(); })();
        return closing;
    }
    return { open, get, put, load, loadPrefix, read, drain, close, entries: () => [...cache.entries()], stats: () => ({ cached: cache.size, knownKeys: keys.size }) };
}
