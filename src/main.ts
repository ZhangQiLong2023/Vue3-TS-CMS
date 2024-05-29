import { createApp } from 'vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { setupStore } from './store'
import 'default-passive-events'

import { globalRegister } from './global'
const app = createApp(App)

// 调用全局函数
app.use(globalRegister)
app.use(store)
// 注意顺序
// 因为注册路由 app.use(router) -> install函数（获取当前浏览器的path）
// 在这一刻拿到路径之后，就会去匹配 router.routes 这使用由于还没有注册路由所以会出现路径是对的，但是结果是错的
// 需要注意的是这个需要放在 use(router) 之前
setupStore() // 每次进入都有初始化 store 中的数据
app.use(router)

app.mount('#app')
