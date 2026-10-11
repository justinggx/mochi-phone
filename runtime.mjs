// MochiPhone-owned resources only. Never changes host globals or other extensions.
export function createPhoneRuntime(host, getSlot, isEnabled = () => true) {
    let epoch = 0;
    let destroyed = false;
    let controller = new host.AbortController();
    const timers = new Map();
    const frames = new Set();
    const disposers = new Set();
    const observers = new Set();
    const chatDisposers = new Set();
    const task = () => {
        const origin = getSlot();
        const serial = epoch;
        const signal = controller.signal;
        return { signal, valid: () => !destroyed && !signal.aborted && serial === epoch && origin === getSlot() && isEnabled() };
    };
    const guard = callback => {
        const token = task();
        return function (...args) {
            if (token.valid()) return callback.apply(this, args);
        };
    };
    const own = cleanup => { if (destroyed) { cleanup(); return cleanup; } disposers.add(cleanup); return cleanup; };
    const consume = result => {
        if (result && typeof result.then === 'function') result.catch(() => host.console?.warn?.('[Phone] background task failed'));
        return result;
    };
    const clearTimer = id => {
        const entry = timers.get(id);
        if (entry) {
            (entry.repeat ? host.clearInterval : host.clearTimeout).call(host, id);
            timers.delete(id);
        }
    };
    const timer = (callback, delay, repeat, args = [], scope = 'chat') => {
        if (destroyed) return null;
        const token = task();
        const run = () => {
            if (!repeat) timers.delete(id);
            if (destroyed || (scope === 'chat' && !token.valid())) { clearTimer(id); return; }
            consume(callback(...args));
        };
        const id = (repeat ? host.setInterval : host.setTimeout).call(host, run, delay);
        timers.set(id, { repeat, scope });
        return id;
    };
    const listen = (source, type, handler, once = false) => {
        if (!source || !type || destroyed) return;
        const token = task();
        const cleanup = () => {
            const remove = source.off || source.removeListener;
            remove?.call(source, type, wrapped);
            disposers.delete(cleanup);
            chatDisposers.delete(cleanup);
        };
        const wrapped = (...args) => {
            if (once) cleanup();
            if (!destroyed && (!once || token.valid()) && (isEnabled() || type === 'chat_id_changed')) return consume(handler(...args));
        };
        source.on(type, wrapped);
        own(cleanup);
        if (once) chatDisposers.add(cleanup);
        return cleanup;
    };
    const listenDOM = (target, type, callback, options) => {
        if (destroyed) return;
        target.addEventListener(type, callback, options);
        const cleanup = () => { target.removeEventListener(type, callback, options); disposers.delete(cleanup); };
        return own(cleanup);
    };
    const advance = () => {
        controller.abort();
        controller = new host.AbortController();
        epoch++;
        for (const [id, entry] of timers) if (entry.scope === 'chat') clearTimer(id);
        for (const id of frames) host.cancelAnimationFrame(id);
        frames.clear();
        for (const cleanup of [...chatDisposers]) cleanup();
    };
    const frame = callback => {
        if (destroyed) return null;
        const token = task();
        const id = host.requestAnimationFrame(time => {
            frames.delete(id);
            if (token.valid()) callback(time);
        });
        frames.add(id);
        return id;
    };
    const cancelFrame = id => { host.cancelAnimationFrame(id); frames.delete(id); };
    const destroy = () => {
        if (destroyed) return;
        advance();
        destroyed = true;
        for (const id of timers.keys()) clearTimer(id);
        for (const observer of observers) observer.disconnect();
        observers.clear();
        for (const cleanup of [...disposers]) { try { cleanup(); } catch {} }
        disposers.clear();
    };
    class Observer extends host.MutationObserver {
        constructor(callback) {
            super((...args) => { if (!destroyed && isEnabled()) callback(...args); });
            if (!destroyed) observers.add(this);
        }
        observe(...args) { if (!destroyed) return super.observe(...args); }
        disconnect() { super.disconnect(); observers.delete(this); }
    }
    const waitForClick = (button, overlay) => new Promise(resolve => {
        if (!button || destroyed) { resolve(false); return; }
        const token = task();
        const click = () => finish(true);
        const abort = () => finish(false);
        const finish = result => {
            button.removeEventListener('click', click);
            token.signal.removeEventListener('abort', abort);
            if (overlay) overlay.style.display = 'none';
            resolve(result);
        };
        button.addEventListener('click', click, { once: true });
        token.signal.addEventListener('abort', abort, { once: true });
        if (!token.valid()) abort();
    });
    const wait = (promise, timeout = 90000, token = task()) => new Promise((resolve, reject) => {
        let id;
        const finish = (fn, result) => {
            host.clearTimeout(id);
            token.signal.removeEventListener('abort', abort);
            fn(result);
        };
        const abort = () => finish(reject, new host.DOMException('Phone task cancelled', 'AbortError'));
        token.signal.addEventListener('abort', abort, { once: true });
        if (timeout > 0) id = host.setTimeout(() => finish(reject, new Error('Phone request timed out')), timeout);
        Promise.resolve(promise).then(result => finish(resolve, result), error => finish(reject, error));
        if (token.signal.aborted) abort();
    });
    const fetchJSON = async (url, options = {}, timeout = 60000) => {
        const token = task();
        const request = new host.AbortController();
        const abort = () => request.abort();
        token.signal.addEventListener('abort', abort, { once: true });
        const id = host.setTimeout(abort, timeout);
        try {
            if (!token.valid()) throw new host.DOMException('Phone task cancelled', 'AbortError');
            const res = await host.fetch(url, { ...options, signal: request.signal });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!token.valid()) throw new host.DOMException('Phone task cancelled', 'AbortError');
            return data;
        } finally {
            host.clearTimeout(id);
            token.signal.removeEventListener('abort', abort);
        }
    };
    return { task, guard, own, timer, clearTimer, listen, listenDOM, advance, frame, cancelFrame, destroy, Observer, waitForClick, wait, fetchJSON,
        stats: () => ({ timers: timers.size, frames: frames.size, listeners: disposers.size, observers: observers.size, destroyed }) };
}
