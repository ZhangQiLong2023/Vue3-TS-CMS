<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <!-- collapse 折叠属性 -->
    <el-menu
      default-active="defaultValue"
      :unique-opened="false"
      text-color="#b7bdc3"
      :collapse="collapse"
      background-color="#0c2135"
      class="el-menu-vertical"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 type=1进行展示-->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题  设置 :index 唯一标识来确定选中状态-->
          <el-sub-menu :index="item.id + ''">
            <!-- submenu的标题 -->
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- submenu的内容 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon">{{ subitem.id }}</i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 type=2进行展示-->
        <template v-else-if="item.type === 2">
          <!-- id是数组类型，但是要求的 index 是字符串类型 -->
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon">{{ item.id }}</i>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index' // 重新封装的 useStore
import { useRouter, useRoute } from 'vue-router'
// 调用设置菜单栏选中状态的menu
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  // 接收是否需要折叠的状态
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    const router = useRouter()

    //2. 获取当前路径
    const route = useRoute()
    const currentPath = route.path

    // 3.根据路径匹配是哪个 menu
    const menu = pathMapToMenu(userMenus.value, currentPath)

    //1. 定义切换侧边栏的状态
    const defaultValue = ref('menu.id' + '')

    // 定义菜单点击事件
    const handleMenuItemClick = (item: any) => {
      // console.log(item) //{id: 40, url: '/main/analysis/dashboard', name: '商品统计', sort: 107, type: 2, …}
      router.push({
        // 路径就会发生改变
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      handleMenuItemClick,
      defaultValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none; // 去掉展开菜单小竖线
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :v-deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
