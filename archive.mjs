// Supplemental large local snapshots; no deletion of legacy ST/browser copies.
export function createPhoneArchive({ indexedDB, databaseName = 'mochi-phone-state-v1', timeout = 3000, setTimer = globalThis.setTimeout, clearTimer = globalThis.clearTimeout } = {}) {
    const cache = new Map();
    const pending = new Set();
    let db = null, opening = null, closed = false, closing = null;
    function open() {
        if (closed) return closing.then(() => { closed = false; opening = null; return open(); });
        if (opening) return opening;
        if (!indexedDB) return Promise.resolve(false);
        opening = new Promise(resolve => {
            let finished = false;
            const timer = setTimer(() => finish(false), timeout);
            function finish(ok) {
                if (finished) return;
                finished = true;
                clearTimer(timer);
                if (!ok) { db?.close(); db = null; cache.clear(); }
                resolve(ok);
            }
            try {
                const request = indexedDB.open(databaseName, 1);
                request.onupgradeneeded = () => {
                    if (!request.result.objectStoreNames.contains('states')) request.result.createObjectStore('states');
                };
                request.onerror = request.onblocked = () => finish(false);
                request.onsuccess = () => {
                    const connection = request.result;
                    if (finished || closed) { connection.close(); finish(false); return; }
                    db = connection;
                    db.onversionchange = () => { db.close(); db = null; };
                    let tx;
                    try { tx = db.transaction('states', 'readonly'); } catch { finish(false); return; }
                    const cursor = tx.objectStore('states').openCursor();
                    cursor.onsuccess = () => {
                        const entry = cursor.result;
                        if (entry) { cache.set(String(entry.key), entry.value); entry.continue(); }
                    };
                    tx.oncomplete = () => finish(true);
                    tx.onerror = tx.onabort = () => finish(false);
                };
            } catch { finish(false); }
        });
        return opening;
    }
    function get(key) { return cache.get(String(key)) || null; }
    function put(key, value) {
        if (!db || closed) return Promise.resolve(false);
        let snapshot;
        try { snapshot = JSON.parse(JSON.stringify(value)); } catch { return Promise.resolve(false); }
        const job = new Promise(resolve => {
            try {
                const tx = db.transaction('states', 'readwrite');
                tx.objectStore('states').put(snapshot, String(key));
                tx.oncomplete = () => { cache.set(String(key), snapshot); resolve(true); };
                tx.onerror = tx.onabort = () => resolve(false);
            } catch { resolve(false); }
        });
        pending.add(job);
        job.finally(() => pending.delete(job));
        return job;
    }
    async function drain() { await Promise.all([...pending]); }
    function close() {
        if (closed) return closing;
        closed = true;
        closing = (async () => { await drain(); db?.close(); db = null; cache.clear(); })();
        return closing;
    }
    return { open, get, put, drain, close };
}
