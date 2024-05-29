const path = require('path')
module.exports = {
  // 关闭 eslint
  lintOnSave: false,
  // 1. 配置方式一：CLI提供的属性
  outputDir: './build', // build 输出后的文件夹是 build，而不是 dist
  // publicPath: './',
  // 配置 devService 解决跨域
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://123.207.32.32:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  /**
   *2.1方式二第一种对象写法
   * configureWebpack 里面的配置会与 webpack 配置合并
   * 通过 `configureWebpack` 修改 `webpack` 的配置:
   */
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }

  // 2.2方式二第二种写法函数形式
  // configureWebpack: (config) => {
  //   // 修改原来的配置，可以修改之前的 alias
  //   config.resolve.alias = {
  //     // 将 @ 修改为当前目录下面的 src 下面
  //     '@': path.resolve(__dirname, "src"),
  //     // 上面的 src 生效的话，可以使用 @/components
  //     components: "@/components"
  //   }
  // }

  // 3.配置方式三：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
