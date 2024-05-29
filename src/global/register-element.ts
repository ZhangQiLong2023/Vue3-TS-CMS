// 只负责组件注册部分
import type { App } from 'vue'
import { ElButton } from 'element-plus'
const components = [ElButton]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
