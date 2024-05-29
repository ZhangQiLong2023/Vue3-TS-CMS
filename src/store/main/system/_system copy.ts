import type { IRootState } from '@/store/types'
import type { Module } from 'vuex'
import type { ISystemState } from './types'
import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    // 修改数据
    changeUserList(state, userList) {
      state.userList = userList
    },
    changeUserCount(state, userCount) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取到 user.vue 传入的参数，用于请求数据
      // console.log(payload.pageUrl)
      // console.log(payload.queryInfo)

      //1. 对页面进行发起请求网络数据
      const pageResult = await getPageListData(payload.pageUrl, payload.queryInfo)

      // console.log(pageResult)  // 数据

      // 对请求数据进行解构
      const { list, totalCount } = pageResult.data

      // 在 actions 里面提交 mutations 修改数据
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
