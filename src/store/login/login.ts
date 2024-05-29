import type { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import type { IAccount } from '@/service/login/type'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router' // 获取router对象
// 请求信息接口配置
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
const loginModule: Module<ILoginState, IRootState> = {
  // 模块化要添加命名空间
  namespaced: true, // 不添加这个会导致 [vuex] unknown action type: login/accountLoginAction 无法获取 actions
  state() {
    return {
      token: '', // 存放 token
      userInfo: {}, // 存放用户信息
      userMenus: [], // 用于存放用户菜单数量
      permissions: []
    }
  },
  getters: {},
  // 修改数据的方式
  mutations: {
    // 将token保存在 vuex 中
    changeToken(state, token: string) {
      // console.log(token)
      // 将传入的 token 保存到 vuex 中
      state.token = token
    },
    // 保存用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存用户请求菜单信息
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 在 utils 工具中封装方法，直接调用
      // 获取到 userMenus 之后将其映射到 routes 里面 userMenus=>routes
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes) // 获取到该用户说用能看到的路由映射对象(即路由)

      // 将 routes 添加到 router.main.children
      // 动态添加路由
      routes.forEach((route) => {
        // 找到对应的一级路由添加 过滤出来的route 注册所有的路由
        router.addRoute('main', route)
      })
    }
  },
  // 点击登录触发 action
  actions: {
    // 账号登录
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log('执行accountLoginAction', payload)
      // 实现登录逻辑 accountLoginRequest() 函数返回的是 promise  同步方式写异步代码
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      // console.log(loginResult.data.id, loginResult.data.token)
      // 提交修改数据的操作提交 Mutation
      commit('changeToken', token)
      // 将token进行本地缓存，需要token的地方直接从本地 localStorage 获取
      localCache.setCache('token', token)

      //2. 登录成功请求用户信息
      const userInfoResult: any = await requestUserInfoById(id)
      // 请求用户信息，需要携带token，在拦截器中进行配置 service/index.ts
      // console.log(userInfoResult)  // 打印用户信息
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 用户信息进行缓存，方便下次免登录直接读取用户信息
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4. 跳到首页
      router.push('/main')
    },
    // 初始化 store 的 action，在本地存储中将数据取出来重新提交commit存入vuex中
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },

    // 手机号登录
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction11', payload)
    }
  }
}

export default loginModule
