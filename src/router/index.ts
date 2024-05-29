import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
// 缓存
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import store from '@/store'
import { firstMenu } from '@/utils/map-menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:patchMatch(.*)',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫，检查如果有token直接跳转到首页，没有跳转到登录页
router.beforeEach((to) => {
  if (to.path !== '/login') {
    // 如果不是登录页的话，需要判断是否有token
    const token = localCache.getCache('token')
    if (!token) {
      // 如果没有 token 跳转到登录页
      return '/login'
    }
    // userMenus => routes
    const userMenus = (store.state as any).login.userMenus
    const routes = mapMenusToRoutes(userMenus)
  }
  // console.log(to)  // url对但是页面错误
  if (to.path === '/main') {
    // 如果路径是 /main 那么就跳到保存的一个url中
    return firstMenu.url
  }
})

export default router
