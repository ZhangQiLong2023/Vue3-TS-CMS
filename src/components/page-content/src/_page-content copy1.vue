<template>
  <div class="page-content">
    <ql-table :listData="userList" v-bind="contentTableConfig">
      <!-- 指定将 status 改为插槽，只改 status 对应的列数据 -->
      <template #status="scope">
        <el-button size="small" :type="scope.row.enable ? 'success' : 'danger'" plain>{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <!-- 按钮写在 user.vue 中，意味着可以做权限控制，有的时候显示，有的时候不显示 -->
      <template #handler>
        <div class="handle-btns">
          <el-button icon="edit" size="small" type="text">编辑</el-button>
          <el-button icon="delete" size="small" type="danger">删除</el-button>
        </div>
      </template>

      <!-- 决定header 和 footer 长什么样子 -->
      <template #header></template>
      <template #footer></template>
      <!-- 按钮插槽 -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
        <el-button icon="refresh">刷新</el-button>
      </template>
    </ql-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

// 使用包装类型后的 useStore 会有类型提示
import { useStore } from '@/store'

import QlTable from '@/base-ui/table'
export default defineComponent({
  components: {
    QlTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    }
  },
  setup() {
    const store = useStore()
    // 调用 system 中的 action 这样可以从外面规定传入的参数
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list', // 请求路径
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    // 从 store 中获取数据
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    return {
      userList,
      userCount
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
