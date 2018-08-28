"use strict";
// 报错
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const config = require("./webpack.conf.dev");
const paths = require("./paths");
const host = process.env.HOST || "0.0.0.0";
module.exports = function(proxy, allowedHost) {
  return {
    // 服务都启gzip压缩
    compress: true,
    // 阻止开发工具(DevTools)的控制台(console)将显示消息
    clientLogLevel: "none",
    // 本地服务器所加载的页面所在的目录
    contentBase: paths.appPublic,
    // 监视文件更改将触发完整页面重新加载
    watchContentBase: true,
    // 热更新
    hot: true,
    // 输出目录
    publicPath: config.output.publicPath,
    // 启用quiet后，除了初始启动信息之外的任何内容都不会被打印到控制台。
    quiet: true,
    // 定制 Watch 模式的选项
    watchOptions: {
      ignored: /node_modules/
    },
    // https: protocol === 'https',
    // IP配置
    // host: host,
    // 是否显示编译错误或警告
    overlay: false,
    // 任意的404响应都可能需要被替代为
    historyApiFallback: {
      disableDotRule: true
    },
    public: allowedHost,
    setup(app) {
      // 报错时直接打开文件
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
    }
  };
};
