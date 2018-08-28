// 定义环境变量
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// 未处理的承诺拒绝将以非零退出代码终止Node.js进程。
process.on("unhandledRejection", err => {
  throw err;
});
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
// 引入webpack配置
const config = require("./config/webpack.conf.dev");
// 引入http服务配置
const createDevServerConfig = require("./config/webpack.server.conf");
// 引入路径配置
const paths = require("./config/paths");
// 引入打开浏览器
const openBrowser = require("react-dev-utils/openBrowser");
// 引入清除控制台
const clearConsole = require("react-dev-utils/clearConsole");
// 引入开发服务所需函数
const {
  choosePort,
  createCompiler,
  prepareUrls
} = require("react-dev-utils/WebpackDevServerUtils");
// 引入node命令行输出颜色
const color = require("colors-cli/safe");
// 控制台信息是否处于TTY上下文。
const isInteractive = process.stdout.isTTY;

// 配置IP地址
const HOST = process.env.HOST || "0.0.0.0";
// 配置端口号
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 6789;

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    //判断端口号
    if (port == null) {
      return;
    }
    // 设置http协议类型
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    // 设置app名称
    const appName = require(paths.appPackage).name;
    // 设置url
    const urls = prepareUrls(protocol, HOST, port);
    // 创建配置有自定义消息的Webpack编译器。
    const compiler = createCompiler(webpack, config, appName, urls);
    // 通过Web服务器提供由编译器生成的webpack资源
    const serverConfig = createDevServerConfig(urls.lanUrlForConfig);
    // 创建devServer
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      // 判断控件台中是否有信息，如果有清除信息
      if (isInteractive) {
        clearConsole();
      }
      // 打印控制台信息
      console.log(color.cyan("☺正在启动文档开发服务，请稍后♪♪♪\n"));
      // 打开浏览器
      openBrowser(urls.localUrlForBrowser);
    });
    // 监听SIGINT,SIGTERM信号并退出
    ["SIGINT", "SIGTERM"].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  // 打印错误并退出
  .catch(err => {
    if (err && err.message) {
      console.log(err, err.message);
    }
    process.exit(1);
  });