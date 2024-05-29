// export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
//   const routes: RouteRecordRaw[] = []
//   const routeFiles = require.context('../router/main', true, '/.ts/')
//   routeFiles.keys().forEach((key) => {
//     const route = require('../router/main' + key.split('.')[1])
//     allRoutes.push(route.default)
//   })
//   console.log(allRoutes) // 与一直导入效果一样，但是 require 问题无法解决
//   // 1.先去加载默认所有的routes
//   const allRoutes: RouteRecordRaw[] = []
//   return routes
// }

import type { IBreadcrumb } from '@/base-ui/breadcrumb'
import type { RouteRecordRaw } from 'vue-router'
import obj from '../router/main/analysis/dashboard/dashboard'
import obj1 from '../router/main/analysis/overview/overview'
import obj2 from '../router/main/product/category/category'
import obj3 from '../router/main/product/goods/goods'
import obj4 from '../router/main/story/chat/chat'
import obj5 from '../router/main/story/list/list'
import obj6 from '../router/main/system/department/department'
import obj7 from '../router/main/system/menu/menu'
import obj8 from '../router/main/system/role/role'
import obj9 from '../router/main/system/user/user'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 先去加载默认所有的 routes
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  allRoutes.push(obj)
  allRoutes.push(obj1)
  allRoutes.push(obj2)
  allRoutes.push(obj3)
  allRoutes.push(obj4)
  allRoutes.push(obj5)
  allRoutes.push(obj6)
  allRoutes.push(obj7)
  allRoutes.push(obj8)
  allRoutes.push(obj9)
  // console.log(allRoutes)  // 所有路由对象 routes 存放的数组

  // 2. 根据菜单获取所有需要添加的 routes 路由

  // userMenus:
  // type ===1 -> children -> type ===1  type不等于一说明是可以展开的菜单，进行递归直到等于2
  // type ===2 -> url -> route

  // 封装递归函数获取 Route 最后将获取到的 route 放进 routes 数组中
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          // 找到 url 中对用的 route
          return route.path === menu.url
        })
        // 如果找到对应的 route 就将其 push 到数组中
        if (route) routes.push(route)
        if (!firstMenu) {
          // 保留第一个菜单
          firstMenu = menu
        }
      } else {
        // type ===1 需要递归调用，直到type===2
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

// 面包屑需要根据路径返回type=1 type=2 的菜单名称
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  // 与下面的type =2 的函数合并成一个函数
  const breadcrumbs: IBreadcrumb[] = []
  // 调用下面的函数,传入数组如果有的话就给数组中添加type=1 type=2的menu
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  // 含有 type =1 和 type=2 的数组
  return breadcrumbs
}

// 根据路径获取 type =2 的菜单 /main/system/role -> type === 2 对应的menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 菜单里面有 children
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 获取type =1 的菜单 有了才会调用
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        // 获取type =2 的菜单
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }

// 合并前代码

// // 面包屑需要根据路径返回type=1 type=2 的菜单名称
// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   // 与下面的type =2 的函数合并成一个函数
//   const breadcrumbs: IBreadcrumb[] = []
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       // 菜单里面有 children
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         // 获取type =1 的菜单
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         // 获取type =2 的菜单
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//     // 含有 type =1 和 type=2 的数组
//     return breadcrumbs
//   }
// }

// // 根据路径获取 type =2 的菜单 /main/system/role -> type === 2 对应的menu
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       // 菜单里面有 children
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }
