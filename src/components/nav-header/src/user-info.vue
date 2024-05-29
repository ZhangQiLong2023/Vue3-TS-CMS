<template>
  <div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          />
          <!-- <span>{{ name }}</span> -->
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="SwitchButton">退出登录</el-dropdown-item>
            <el-dropdown-item icon="Avatar" divided>用户信息</el-dropdown-item>
            <el-dropdown-item icon="Menu" divided>系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    return {
      name
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
