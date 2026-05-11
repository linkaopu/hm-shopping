import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 加载图标
    duration: 0 // 不会自动关闭，必须手动关
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  // 验证返回的状态码是否为200
  if (res.status !== 200) {
    // 如果不是200，说明请求失败，弹出错误提示
    Toast.fail(res.message || '请求失败')
    Promise.reject(new Error(res.message || '请求失败'))
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
