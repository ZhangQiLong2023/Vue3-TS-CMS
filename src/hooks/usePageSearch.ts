import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  // 获取页面 page-content 组件
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 实现重置按钮
  const handleResetClick = () => {
    // 这里没有参数
    pageContentRef.value?.getPageData()
  }
  // 实现搜索按钮逻辑
  const handleQueryClick = (queryInfo: any) => {
    //不实现具体逻辑，这里是为了实现调用另外一个 page-content 中的方法
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
