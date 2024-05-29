import type { ILoginState } from './login/types'
import type { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
}

// 使用自己封装的 useStore，当以后需要增加新模块的时候，只需要在
// IRootWithModule 里面添加即可 比如这次新增了 login 模块，使用自己的useStore()获得内容提示
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
