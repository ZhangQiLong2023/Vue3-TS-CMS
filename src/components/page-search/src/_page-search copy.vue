<template>
  <div class="page-search">
    <div class="search">
      <!-- <ql-form
        :form-items="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
        :colLayout="colLayout"
      /> -->
      <!-- <ql-form v-bind="searchFormConfig" :formData="formData" /> -->
      <!-- 方案二：v-model -->
      <ql-form v-bind="searchFormConfig" v-model="formData">
        <!-- 使用插槽 在组件中定义 header 的 slot-->
        <!-- <template #header>
          <h1 class="header">高级检索</h1>
        </template> -->
        <template #footer>
          <div class="handle-btns">
            <el-button type="primary" icon="refresh">重置</el-button>
            <el-button type="primary" icon="search">搜索</el-button>
          </div>
        </template>
      </ql-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QlForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    QlForm
  },
  setup() {
    const formData = ref({
      id: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
