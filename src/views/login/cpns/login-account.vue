<template>
  <div class="login-account">
    <!-- form 表单 :model 绑定数据  :rules 绑定规则 item prop 绑定具体数据-->
    <el-form ref="formRef" :model="account" :rules="rules">
      <el-form-item prop="username">
        <el-input
          size="large"
          type="text"
          placeholder="用户名"
          tabindex="1"
          autocomplete="off"
          v-model="account.name"
        >
          <!-- icon -->
          <template #prefix>
            <el-icon class="el-input__icon"><Avatar /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="large" placeholder="密码" v-model="account.password" show-password>
          <!-- icon -->
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache' // 导入存储数据对象
//. 从 vuex 获取登录 Store
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    //.. 获取store
    const store = useStore()
    // 账号密码联系非常紧密，里使用reactive
    const account = reactive({
      // 默认状态下账号密码
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      // 验证表单信息，通过规则 valid 为 true 否则为 false
      formRef.value?.validate((valid) => {
        if (valid) {
          // 登录逻辑 1. 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 开始进行登录验证需要将账号密码传入，但是 account 是响应式对象需要先解构放入新对象
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      // 抽离rules
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
.login-account {
  width: 100%;
  height: 100%;
  .el-form {
    .el-form-item {
      .el-input {
        height: 50px;
        .el-input__icon {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
