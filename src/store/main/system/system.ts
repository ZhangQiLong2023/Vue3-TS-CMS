import type { IRootState } from '@/store/types'
import type { Module } from 'vuex'
import type { ISystemState } from './types'
import { getPageListData } from '@/service/main/system/system'

// 定义一个 map
// const pageUrlMap = {
//   users: '/api/users/abc/list',
//   role: '/api/role/cba/list'
// }

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0
    }
  },
  mutations: {
    // 修改数据
    changeUserList(state, userList) {
      state.userList = userList
    },
    changeUserCount(state, userCount) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount) {
      state.goodsCount = goodsCount
    }
  },
  // 在 getters 里面封装 get 间接获取 state 里面的数据
  // getter1 在 page-content 第二步
  getters: {
    // 配置 getters
    pageListData(state) {
      // return state.userList
      // getter 可以返回一个函数，获取 dataList 数据列表
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'user':
        //     return state.userList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    // 获取 dataCount 数据总数列表
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrlName = payload.pageName === 'user' ? 'users' : payload.pageName
      const pageUrl = `/${pageUrlName}/list`

      // 动态pageUrl
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      // 提交 mutations 修改数据 首字母大写
      commit(`change${pageName[0].toUpperCase() + pageName.substr(1)}List`, list)
      commit(`change${pageName[0].toUpperCase() + pageName.substr(1)}Count`, totalCount)

      // switch (pageName) {
      //   case 'user':
      //     commit('changeUserList', list)
      //     commit('changeUserCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      //     break
      // }
    }
  }
}

export default systemModule
