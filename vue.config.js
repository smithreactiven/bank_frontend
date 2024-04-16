const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: true,
    },
    https: true,
    proxy: {
      "/api" : {
        target: "http://localhost:5001",
        ws: true,
        changeOrigin: true
      },
    },
  }
})
