import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//1. QLRequestInterceptors 接口规定拦截器参数及其类型
//四、 并且接收类型 T 接口中拦截器参数可以使用接口类型 T (默认情况下AxiosResponse 可以不传入 T)
export interface QLRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求错误拦截
  requestInterceptorCatch?: (error: any) => any
  //五、 响应拦截 接口属性可以使用接口的类型，res 的类型变为除 AxiosResponse 之外的 T 类型
  responseInterceptor?: (res: T) => T
  // 响应错误拦截
  responseInterceptorCatch?: (error: any) => any
}

//2. QLRequestConfig 继承 AxiosRequestConfig 添加新属性 new QLRequest、qlRequest.request可以使用新参数
//二、 接收到 QLRequestConfig 传递过来的 T 默认值是 AxiosResponse
export interface QLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: QLRequestInterceptors<T> //三、 接受到的类型 T 继续传递下去
  showLoading?: boolean // qlRequest.request({}) 传入showLoading 决定是否展示 loading
}
