export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, { createdAt: Date.now(), val });
    }
    get(key) {
        const value = this.#cache.get(key);
        if (value) {
            return value.val;
        }
        return undefined;
    }
    #reap() {
        const now = Date.now();
        for (const [key, value] of this.#cache) {
            if (this.#interval < now - value.createdAt) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    stopReapLoop() {
        if (!this.#reapIntervalId)
            return;
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
