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
        for (const [key, value] of this.#cache) {
            if (value.createdAt < Date.now() - this.#interval) {
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
