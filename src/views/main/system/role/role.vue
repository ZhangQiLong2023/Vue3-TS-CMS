<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <!--3. 传入 pageName= "role"-->
    <page-content :contentTableConfig="contentTableConfig" pageName="role"> </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//1. 封装好的列表组件
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

//2. 传入配置信息

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  name: 'role',
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
