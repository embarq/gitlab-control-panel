const stub = {
  get(key, cb) { cb({[key]:localStorage.getItem(key)}) },
  set(obj, cb) {
    Object.entries(obj).forEach(([key, value]: any) => localStorage.setItem(key, value));
    cb();
  },
  clear(cb) { localStorage.clear(); cb(); },
  remove(key, cb) { localStorage.removeItem(key); cb(null) }
}

if (chrome.storage == null) {
  chrome.storage = {
    local: stub
  } as any;
}

export const ChromeLocalStorage = {
  get<T = any>(key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      chrome.storage.local.get(key, data => {
        if (chrome.runtime.lastError != null) {
          return reject(chrome.runtime.lastError);
        }

        resolve(data[key]);
      })
    });
  },
  set(key: string, value: any) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError != null) {
          return reject(chrome.runtime.lastError);
        }

        resolve();
      });
    });
  },
  clear() {
    return new Promise((resolve) =>
      chrome.storage.local.clear(() => resolve(null))
    );
  },
  remove(key: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, () => {
        if (chrome.runtime.lastError != null) {
          return reject(chrome.runtime.lastError);
        }

        resolve();
      });
    });
  }
}
