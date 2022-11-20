enum CacheType {
  l = 'localStorage',
  s = 'sessionStorage'
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.l ? window.localStorage : window.sessionStorage
  }

  set(key: string, value: any): void {
    const data = JSON.stringify(value)
    this.storage.setItem(key, data)
  }

  get(key: string): object | null {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return null;
    }
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }


  clear() {
    this.storage.clear()
  }
}

const LCache = new Cache(CacheType.l)
const SCache = new Cache(CacheType.s)

export { LCache, SCache }
