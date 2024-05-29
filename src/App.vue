<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
