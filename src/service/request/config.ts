// 方式二：通过 definePlugin 插件在不同的环境下给 process.env.NODE_ENV 注入不同的值
// process.env.NODE_ENV 的三种值
// 在开发环境下：development
// 生产环境：production
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 1000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://zql.org/prod'
} else {
  BASE_URL = 'http://zql.org/test'
}
// 导出
export { BASE_URL, TIME_OUT } // 这里不是对象，而是一种语法
