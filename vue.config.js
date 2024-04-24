const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
    client: {
      overlay: false,
    },
    https: false,
    proxy: {
      "/api" : {
        target: "http://localhost:5001",
        ws: true,
        changeOrigin: true
      },
    },
  }
})
