<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/img/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <login-panel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 登录面板
import LoginPanel from './cpns/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
/* 登录页布局采用 flex 布局
上下垂直居中设置背景图
*/
.login-container {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  background: url(@/assets/img/login_bg.svg);
  background-size: 100% 100%;
  background-size: cover;
  .login-box {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 96%;
    height: 94%;
    padding: 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    .login-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
