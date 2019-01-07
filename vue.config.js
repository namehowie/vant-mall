module.exports = {
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8090,
    hotOnly: false, // string | Object
    before: app => {
      console.log(app);
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      // 为开发环境修改配置...
      config.devtool = "#cheap-module-eval-source-map";
    }
  }
};
