<template>
  <div class="login-panel">
    <div class="title_hello">Hello！</div>
    <div class="title_welcome">欢迎来到Q7-Admin-Element</div>
    <!-- el-tabs 切换栏
			 	 stretch 切换栏内容平分 login-panel 的宽度 
		-->
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <!-- 插槽决定切换栏 -->
        <template #label>
          <span>
            <el-icon><Avatar /></el-icon>
            账号登录
          </span>
        </template>
        <!-- 内容区域 绑定 ref 获取组件对象-->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon>
            手机登录
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 外部组件执行点击操作，登录逻辑放在内部组件 -->
    <el-button class="login" @click="handleLoginClick">登录</el-button>
  </div>
</template>

<script lang="ts">
// 只关注点击登录，登录逻辑在内部实现
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(false)
    // 获取登录信息组件对象  ref 后面获取 LoginAccount 导出的组件对象的类型，即只能调用组件对象导出的方法，其他不可以调用防止写错
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account') // 保存登录栏状态
    // 定义方法
    const handleLoginClick = () => {
      // 调用组件对象里面的 loginAction() 方法执行登录逻辑
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab // 选中状态
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 230px;
  margin-right: 100px;
  height: 260px;
  width: 450px;
  .title_hello {
    margin-bottom: 29px;
    font-size: 26px;
    font-weight: 900;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #0e121a;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title_welcome {
    margin-bottom: 29px;
    font-size: 20px;
    font-weight: 600;
    color: #0e121a;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Trebuchet MS';
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 3px;
  }
  .login {
    height: 55px;
    width: 450px;
  }
  .el-button {
    background-color: #4db6ac;
    color: aliceblue;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
