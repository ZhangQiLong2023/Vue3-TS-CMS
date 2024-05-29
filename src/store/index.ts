import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './types'
// 注册 login 模块
import login from './login/login'
import system from './main/system/system'

// createStore 要求传入一个对象
const store = createStore<IRootState>({
  // 对象里面是函数
  state() {
    return {
      name: 'Q7Long',
      age: 23
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

//如果用户通过token直接进入首页，那么store中是没有信息的，如何做呢？
// 用户每次进入都会调用函数初始化 store 中的数据
export function setupStore() {
  // 在 store 中单独封装一个 loadLocalLogin action
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  // useVuexStore 还是 useStore() 依然是在调用 useStore
  // 这里仅仅是多一层包装指明了 Store的类型，使用联合类型给里面多添加了一个login属性
  return useVuexStore()
}

// 导出 store
export default store
