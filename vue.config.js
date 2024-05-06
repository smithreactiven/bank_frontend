const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    https: true,
    proxy: {
      "/api" : {
        target: "http://localhost:8081",
        ws: true,
        changeOrigin: true
      },
    },
  }
})
