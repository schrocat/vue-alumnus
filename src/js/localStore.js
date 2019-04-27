const STORAGE_KEY = 'USERINFO'
// const TOKEN_KEY = 'TOKEN'
export default {
  fetch () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save (items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  fetchWithKey (key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  removeWithKey (key) {
    window.localStorage.removeItem(key)
  },
  saveWithKey (key, items) {
    window.localStorage.setItem(key, JSON.stringify(items))
  }
}
