// 缓存 类有更强的封装性，封装一些方法
class LocalCache {
  // 本地缓存数据
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清除所有缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
