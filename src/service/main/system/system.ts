import qlRequest from '@/service'
import type { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return qlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
