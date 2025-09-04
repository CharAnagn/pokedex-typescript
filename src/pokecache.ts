export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    const value = this.#cache.get(key);

    if (value) {
      return value.val as T;
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
    if (!this.#reapIntervalId) return;
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
