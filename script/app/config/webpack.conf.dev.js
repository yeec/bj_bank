const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const paths = require("./paths");
//代码抽离插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var entrys = require('../../../app/entrys/config/sample.js');
var entryList = {};

var devConfig = {
  // 如果希望在DevTools中看到编译的输出，您可能需要'eval'。
  devtool: "source-map",
  //入口配置
  entry: entryList,
  output: {
    // 下一行未在dev中使用，但WebpackDevServer没有崩溃：
    path: paths.appBuild,
    // 高级输出配置
    // https://webpack.js.org/configuration/output/#output-path
    // 告诉Webpack将包含有关所包含模块信息的包含注释。
    // 此选项默认为false，不应在生产中使用，但在读取生成的代码时非常有用。
    pathinfo: true,
    // 这不会产生真实的文件。
    // 这只是WebpackDevServer在开发中提供的虚拟路径。
    // 这是包含所有入口点的代码和Webpack运行时的JS包。
    // filename: "static/js/bundle.js",
    // 这是应用程式的网址。 我们在开发中使用“/”。
    publicPath: "/",
    // 将源映射条目指向原始磁盘位置（格式为Windows上的URL）
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    // 这允许您设置Webpack应该查找模块的后备。
    modules: ["node_modules", paths.appNodeModules].concat(),
    // 添加`web`扩展名前缀，以更好地支持各种组件类型。
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx", ".tsx"],
    alias: {
      // 项目组件目录
      components: paths.appComponents,
      // 项目公共方法目录
      utils: paths.appUtils,
      // API目录
      constants: paths.appConstants,
      // 样式目录
      style: paths.appStyle
    },
    plugins: [
      // 阻止用户从 src/（或node_modules/）外部导入文件,只通过 babel 处理 app/中的文件。
      // new ModuleScopePlugin(paths.appComponents, [paths.appPackage])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [{
        // 使用Babel处理JS资源
        test: /\.(js|jsx|tsx)$/,
        include: [paths.appSrc, paths.appComponents],
        loader: require.resolve("babel-loader"),
        options: {
          // 这是webpack的“babel-loader”（不是Babel本身）的一个功能。
          // 它启用缓存结果./node_modules/.cache/babel-loader/
          // 用于更快重建的目录。
          cacheDirectory: true
        }
      },
      {
        //样式资源处理
        test: /\.(css|less)$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009"
                }),
                // 设置REM比例值
                require("postcss-px2rem")({
                  remUnit: 75
                })
              ]
            }
          },
          require.resolve("less-loader")
        ]
      },
      {
        //图片资源处理
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: [
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
    // 在我们的业务代码和第三方包的代码中很多时候需要判断 `process.env.NODE_ENV` 来做不同处理，而在生产环境中我们显然不需要非 `production` 的处理部分。
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      )
    }),
    //样式文件抽离配置
    // new ExtractTextPlugin("[name].css"),
    //热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 将模块名称添加到工厂功能，以便它们显示在浏览器分析器中。
    new webpack.NamedModulesPlugin(),
    // 如果您需要一个缺少的模块，然后再安装npm，那么您仍然需要重新启动Webpack的开发服务器来发现它。
    // 此插件使自动发现，所以您不必重新启动。
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  // 有些库导入Node modules，但不要在浏览器中使用它们,告诉Webpack为他们提供空的mock，以便导入它们。
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  // 在开发过程中关闭性能提示，因为我们不做任何感兴趣的拆分或缩小。
  performance: {
    hints: false
  }
};

// entry入口*************************
let entryName = [];
for (var item in entrys) {
  serverList = [
    "babel-polyfill",
    require.resolve("react-dev-utils/webpackHotDevClient"),
    entrys[item][0]
  ]
  entryName.push(item);
  entryList[item] = serverList;
}
// html页面入口-打包压缩*************************
entryName.forEach(function (item) {
  devConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: "ryt",
      template: paths.appHtml,
      filename: item + '.html',
      chunks: [item],
      inject: true,
      //压缩HTML配置-移除属性的引号等优化
      minify: {
        removeAttributeQuotes: true
      },
      hash: true
    }),
  )
})
module.exports = devConfig;