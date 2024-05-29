// 封装 url 在 store 中的 login/login.ts 中读取信息
import qlRequest from '../index'

import type { IAccount, ILoginResult } from './type'
import type { IDataType } from '../types'
// 设置枚举：为了防止 URL 被改掉，以后方便修改
enum LoginAPI {
  AccountLogin = '/login', // 登录信息
  LoginUserInfo = '/users/', // 获取用户信息 /users/1
  UserMenus = '/role/' // 用法：role/1/menu
}

// 登录操作 POST 请求
export function accountLoginRequest(account: IAccount) {
  return qlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户信息 GET请求 需要传 id
export function requestUserInfoById(id: number) {
  return qlRequest.get({
    url: LoginAPI.LoginUserInfo + id
  })
}

// 用户菜单请求
export function requestUserMenusByRoleId(id: number) {
  return qlRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
