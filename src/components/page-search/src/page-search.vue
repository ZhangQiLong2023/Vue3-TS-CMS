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
            <el-button type="primary" icon="refresh" @click="handleResetClick">重置</el-button>
            <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
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
  //1. 所有需要发出到 user 组件的事件
  emits: ['resetBtnClick', 'queryBtnClick'],
  //2. 拿到 emit
  setup(props, { emit }) {
    // 优化一：formData 中的属性应该动态来决定
    // 双向绑定的属性应该是由配置文件的 field 来决定
    // 所以 formData 里面的数据不能写死，应该由配置文件来决定
    const formItems = props.searchFormConfig?.formItems ?? [] // 如果为空则默认空数据
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 优化二：当用户点击重置
    const handleResetClick = () => {
      // 将设置的值赋值为原始对象
      // formData.value = formOriginData
      // 重置第二种方式，通过找到初始化数据和 formData 中数据相同的 key 来修改数据
      // 因为是浅拷贝，所以 formData中属性值发生改变，那么对象中也会跟着一起改变
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      // 3.重置按钮不需要参数
      emit('resetBtnClick')
    }

    // 优化三： 当用户点击搜索
    const handleQuery = () => {
      //4. 需要参数，收集所有 form 中的数据传入
      // 5.在 user 组件上监听事件 @resetBtnClick ="handleResetClick" @queryBtnClick="handleQueryClick"
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQuery
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
