// 进行全局注册图标 icon。

import type { App } from 'vue'
// 导入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function (app: App): void {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
