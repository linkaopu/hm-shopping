// 定义一个常量，作为存储用户信息的键名
const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'

export const setUserInfo = (obj) => {
  // 将用户信息对象转换为 JSON 字符串，并存储在 localStorage 中
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const getUserInfo = () => {
  // 从 localStorage 中获取用户信息的 JSON 字符串
  const infoStr = localStorage.getItem(INFO_KEY)
  // 如果存在用户信息，则将 JSON 字符串解析为对象并返回；否则返回 null
  return infoStr ? JSON.parse(infoStr) : { token: '', userId: '' }
}

export const removeUserInfo = () => {
  // 从 localStorage 中移除用户信息
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
