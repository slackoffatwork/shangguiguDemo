module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {"^/api" : ""}
      }
    }
  }
}
// 解决跨域问题
