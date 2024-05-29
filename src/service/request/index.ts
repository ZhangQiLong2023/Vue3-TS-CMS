// src\service\request\index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { QLRequestInterceptors, QLRequestConfig } from './type'

import { ElLoading } from 'element-plus/lib/components/loading/index' // 导入 element-plus loading效果
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

// 设置常量统一管理状态
const DEFAULT_LOADING = true

class QLRequest {
  instance: AxiosInstance
  interceptors?: QLRequestInterceptors
  loading?: any
  showLoading?: boolean
  constructor(config: QLRequestConfig) {
    this.instance = axios.create(config)
    //request config 参数传入 Loading 的状态 undefined 取后
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求拦截器成功')
        if (this.showLoading) {
          // 开启 loading
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：请求拦截器失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器：响应拦截器成功')
        // 响应成功关闭 loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        // 从结果中取出 data 分析
        const data = res.data
        // data类型一：{data:"",success:false,returnCode:-1001}
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：响应拦截器失败')
        // 响应失败关闭 loading
        this.loading?.close()
        // data类型二： 4xx 5xx 2xx
        switch (err.response.status) {
          case 404:
            console.log('404错误')
            break
          case 403:
            console.log('403错误')
            break
        }
        return err
      }
    )
  }
  // QLRequestConfig 相较于 AxiosRequestConfig 多增加了拦截器(interceptors) 参数
  // 返回 promise，在请求qlRequest.request({]}).then(res=>{})的时候通过 .then 获取结果

  // 发送 request 请求
  //一、 给QLRequestConfig<T>传递一个类型 T 在接口type文件中进行接收
  request<T = any>(config: QLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, rejects) => {
      // 判断是否存在请求拦截器
      if (config.interceptors?.requestInterceptor) {
        // 有请求拦截器，执行拦截器(比如携带token)，在原来基础上增加了(携带token操作) config = return token + config
        config = config.interceptors?.requestInterceptor(config)
      }
      // 请求时候对 showLoading 的传参决定 loading 展示与否
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        // 6.
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            // 需要传入 AxiosResponse 类型的 res 而 request<T> 限制 res 类型为 T 就无法赋值给要求res->AxiosResponse 类型的数据
            // 给接口 QLRequestConfig 设置类型 T ，默认情况下接口不用传递类型，传递类型之后，接口中的属性可以使用接口类型，从而使得接口中属性类型变为动态
            res = config.interceptors?.responseInterceptor(res)
          }
          //2. 之前返回数据的地方
          // console.log(res)

          //3. 现在通过 Promise 返回给请求时候的 qlRequest.request({}).then()
          // 5.类型“AxiosResponse<any, any>”的参数不能赋给类型“T
          resolve(res) //4. 但是这里res类型是 AxiosResponse 与 DataType 不匹配

          // 响应成功初始化 showLoading
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          // 响应成功初始化 showLoading
          this.showLoading = DEFAULT_LOADING
          rejects(err)
          return err
        })
    })
  }

  // get 请求
  get<T = any>(config: QLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  // post 请求
  post<T = any>(config: QLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  // delete 请求
  delete<T = any>(config: QLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  // patch 请求
  patch<T = any>(config: QLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default QLRequest
