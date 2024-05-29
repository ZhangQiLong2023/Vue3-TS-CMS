// src\service\index.ts
// service 统一出口
import localCache from '@/utils/cache'
import QLRequest from './request'
// 配置 BASE_URL
import { BASE_URL, TIME_OUT } from './request/config'

const qlRequest = new QLRequest({
  baseURL: 'http://123.207.32.32:5000',
  timeout: TIME_OUT,
  // 拦截器可选参数，如果传入进行拦截
  interceptors: {
    requestInterceptor: (config) => {
      // 全局携带 token 的拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        // 要求把 token 放进请求头中
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('局部拦截器：请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('局部拦截器：请求失败拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('局部拦截器：响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('局部拦截器：响应失败拦截')
      return err
    }
  }
})
// 这样做之后每个实例都有自己的拦截器，并且拦截器是可选传入的，拦截器数量也是可选传入
const qlRequest1 = new QLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器
  interceptors: {
    requestInterceptor: (config) => {
      return config
    }
  }
})

// 导出
export default qlRequest
