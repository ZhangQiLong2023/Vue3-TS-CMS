<template>
  <div class="page-content">
    <ql-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
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
import { defineComponent, computed, ref, watch } from 'vue'

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
    },
    // 接收一个 pageName 属性
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const store = useStore()
    // 调用 system 中的 action 这样可以从外面规定传入的参数

    // 双向绑定 pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 20 })

    // 监听 pageSize 和 pageCount 数据变化重新发送网络请求
    watch(
      pageInfo,
      () => {
        getPageData()
      },
      {
        deep: true
      }
    )

    // 发送网络请求 默认是空对象，没有传入默认空对象
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list', // 请求路径
        pageName: props.pageName,
        queryInfo: {
          // 这里不能写死与 qlTable 中数据进行联动
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          // offset: 0,
          // size: 10,
          ...queryInfo // 收集到的表单数据，带条件的查询，关键字模糊查询
        }
      })
    }
    getPageData()

    // 从 vuex 中获取数据

    // const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)
    // getter2   这样获取的就是data list  getters 里面返回的是一个函数，传入参数
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName))

    return {
      dataList,
      getPageData, // return 出去父组件用 组件ref.value.方法调用
      dataCount,
      pageInfo
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
