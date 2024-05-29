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
                <!-- 第三种方式，不使用 v-model 而使用v-model 在组件上原生的方式书写
                通过 :model-value 直接绑定传入的值，当数据发生改变通过 @update:modelValue 修改数据
                参数：最新的值，内部传入的值在 $event 中，item.field 是当前字段
                不使用 v-model 语法糖，而使用 拆开之后的绑定数据和事件，并且自定义监听事件
                -->
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
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

    // watch(
    //   formData,
    //   (newValue) => {
    //     // console.log(newValue)
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )
    const handleValueChange = (value: any, field: string) => {
      // 就可以拿到最新的值和 field，由于 form 中绑定的是大的 formData v-model="formData"
      // 所以这里传出去的话需要将大的对象传出去
      // 当数据发生改变之后，发出事件，并且传出整个对象，要是某一个数据发生改变，就将其字段作为 key 传入
      emit('update:modelValue', { ...props.modelValue, [field]: value })

      // 这样写之后 page-search 中的重置方法也仅仅需要写成 formData.value = formOriginData 即可
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.ql-form {
  padding-top: 22px;
}
</style>
