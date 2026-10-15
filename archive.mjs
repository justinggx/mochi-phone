// Supplemental large local snapshots; no deletion of legacy ST/browser copies.
export function createPhoneArchive({ indexedDB, databaseName = 'mochi-phone-state-v1', timeout = 3000, setTimer = globalThis.setTimeout, clearTimer = globalThis.clearTimeout } = {}) {
    const cache = new Map();
    const pending = new Set();
    let db = null, opening = null, closed = false, closing = null, epoch = 0;
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
                finished = true;
                clearTimer(timer);
                ok = ok && serial === epoch && !closed;
                if (!ok) { connection?.close(); if (db === connection) db = null; if (serial === epoch) cache.clear(); }
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
                        if (db === connection) { epoch++; db = null; opening = null; cache.clear(); }
                    };
                    let tx;
                    try { tx = db.transaction('states', 'readonly'); } catch { finish(false); return; }
                    const cursor = tx.objectStore('states').openCursor();
                    cursor.onsuccess = () => {
                        const entry = cursor.result;
                        if (entry && serial === epoch && !closed) { cache.set(String(entry.key), entry.value); entry.continue(); }
                    };
                    tx.oncomplete = () => finish(true);
                    tx.onerror = tx.onabort = () => finish(false);
                };
            } catch { finish(false); }
        });
        // Failed attempts are retryable, including synchronous open errors.
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
        const job = (async () => {
            if (!db && !await open()) return false;
            if (closed || serial !== epoch) return false;
            return new Promise(resolve => {
            try {
                const tx = db.transaction('states', 'readwrite');
                tx.objectStore('states').put(snapshot, String(key));
                tx.oncomplete = () => { if (serial === epoch && !closed) cache.set(String(key), snapshot); resolve(true); };
                tx.onerror = tx.onabort = () => resolve(false);
            } catch { resolve(false); }
            });
        })();
        pending.add(job);
        job.finally(() => pending.delete(job));
        return job;
    }
    async function drain() { await Promise.all([...pending]); }
    function close() {
        if (closed) return closing;
        closed = true;
        epoch++; opening = null;
        const connection = db; db = null;
        closing = (async () => { await drain(); connection?.close(); cache.clear(); })();
        return closing;
    }
    return { open, get, put, drain, close };
}
