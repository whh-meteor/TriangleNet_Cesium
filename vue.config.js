const { defineConfig } = require('@vue/cli-service')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  devServer: {
    port: 8135,
    client: {
      overlay: false
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '~': resolve('./')
      }
    }
  },
  css: {
    loaderOptions: {
      // sass: {
      //   // 旧版本的 `additionalData` 会被处理为 `data`
      //   additionalData: `@import "@/style.scss";`
      // },
      scss: {
        additionalData: `@import "@/style.scss";`,
        // 通过 `quietDeps` 关闭警告
        sassOptions: {
          quietDeps: true
        }
      }

    },
  },
  terser: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  productionSourceMap: false,
  //cesium-config
  transpileDependencies: true,
  lintOnSave: false
})
