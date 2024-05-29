<template>
  <div class="login-phone">
    <el-form ref="formRef" :model="phone" :rules="rules">
      <el-form-item prop="num">
        <el-input
          size="large"
          type="text"
          placeholder="请输入电话号码"
          tabindex="1"
          autocomplete="off"
          v-model="phone.num"
        >
          <!-- icon -->
          <template #prefix>
            <el-icon class="el-input__icon"><PhoneFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" v-model="phone.code" class="el-input_code">
          <!-- icon -->
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
        <el-button class="code_button">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from 'vue'
import { rules } from '../config/phone-config'
import { useStore } from 'vuex'
import type { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    //.. 获取store
    const store = useStore()
    const phone = reactive({
      num: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }
    return {
      phone,
      rules,
      store,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.login-phone {
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
      .el-input_code {
        width: 290px;
      }
      .code_button {
        margin-left: 15px;
        height: 50px;
        width: 110px;
      }
      .el-button {
        background-color: #4db6ac;
        color: aliceblue;
        font-weight: 400;
      }
    }
  }
}
</style>
