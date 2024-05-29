<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <div class="content">
      <page-content ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="user" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QlTable from '@/base-ui/table'

// 引入封装好的组件
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

// 导入封装好的配置文件
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

// 导入公共方法
import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  components: {
    PageSearch,
    QlTable,
    PageContent
  },
  name: 'user',
  setup() {
    // 使用hooks 注意顺序
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // // 获取页面 page-content 组件
    // const pageContentRef = ref<InstanceType<typeof PageContent>>()
    // // 实现重置按钮
    // const handleResetClick = () => {
    //   // 这里没有参数
    //   pageContentRef.value?.getPageData()
    // }
    // // 实现搜索按钮逻辑
    // const handleQueryClick = (queryInfo: any) => {
    //   //不实现具体逻辑，这里是为了实现调用另外一个 page-content 中的方法
    //   pageContentRef.value?.getPageData(queryInfo)
    // }
    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      handleResetClick,
      pageContentRef
    }
  }
})
</script>

<style scoped></style>
