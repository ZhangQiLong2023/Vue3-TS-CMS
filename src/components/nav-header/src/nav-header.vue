<template>
  <div class="nav-header">
    <div class="fold-menu">
      <el-icon v-if="isFold" @click="handleFoldClick"><Expand /></el-icon>
      <el-icon v-else @click="handleFoldClick"><Fold /></el-icon>
    </div>
    <div class="content">
      <ql-breadcrumb class="ql-breadcrumb" :breadcrumbs="breadcrumbs" />
      <div class="user-info"><user-info /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import QlBreadcrumb from '@/base-ui/breadcrumb'
import type { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
// 获取当前路径
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    UserInfo,
    QlBreadcrumb
  },
  // 需要将切换侧边栏是否折叠状态传到上一层，从而改变侧边栏宽度
  emits: ['foldChange'],
  setup(porps, { emit }) {
    const isFold = ref(false) // 默认情况下不折叠
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //1. 面包屑的数据:[{name:,path:}]
    //2. 根据路径获取菜单的名称
    // 3.不管是 route 路由发生改变还是 菜单 userMenus 发生改变，都需要重新获取breadcrumb
    const breadcrumbs: any = computed(() => {
      // 获取useMenus
      const store = useStore()
      const userMenus = store.state.login.userMenus
      // 获取当前路径
      const route = useRoute()
      const currentPath = route.path
      pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer; // 鼠标进入小手
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1; // 这样是除了 fold-menu 其他的空间全部占据
    padding: 0 20px;
  }
}
</style>
