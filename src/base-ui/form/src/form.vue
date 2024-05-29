<template>
  <div class="ql-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" key="item.label">
          <el-col v-bind="collLayout">
            <!-- 直接使用 props 传入的 itemStyle -->
            <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <!-- 直接绑定其他属性 -->
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { IFormItem } from '../types'
export default defineComponent({
  props: {
    // 父组件使用子组件时候 v-model 传入数据
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      // [{label,value}] 确定数组里面的东西
      type: Array as PropType<IFormItem[]>,
      // 默认值注意点：对象和数组的高级类型需要写成箭头函数
      default: () => [] // 默认值空数组
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      // 默认的 padding
      default: () => ({ padding: '10px 40px' })
    },
    // 响应式
    collLayout: {
      type: Object,
      default: () => ({
        xl: 8, //>1920 的屏幕占4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  // emit 发送一个事件之后用 v-model="formData" 接收
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 将对象拷贝一份放入新的对象中，当数据发生改变的时候通过 emit 发送出去
    // 这种方式实现的双向绑定，而不是通过引用去修改
    const formData = ref({ ...props.modelValue })
    // 监听 formData,deep = true 当对象中某一个属性发生改变也会监听到发出事件

    // 重置第一种方式：使用 watch 监听 modelValue 的变化，重新对 formData 赋值引起视图更新
    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     formData.value = { ...newValue }
    //   }
    // )

    watch(
      formData,
      (newValue) => {
        // console.log(newValue)
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.ql-form {
  padding-top: 22px;
}
</style>
