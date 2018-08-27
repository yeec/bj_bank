//引入所需插件
const autoprefixer = require("autoprefixer");
const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

// Webpack使用`publicPath'来确定应用程序在哪里发送。
const publicPath = paths.servedPath;
// 对于这些，“首页”可以设置为“.”。 以启用相对资产路径。
// SourceMap繁重，可能导致大型源文件的内存不足问题。
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
// 注意：在这里定义，因为它将被使用不止一次。

//公共组件定义
const vendors = ["react", "react-dom", "babel-polyfill", "classnames", "prop-types", "lib-flexible"];
const components = ["./app/components/base/index.js"];
module.exports = {
  // 如果有任何错误，请勿尝试继续。
  bail: true,
  // 我们在生产中生成源代码图(SourceMap)。 这很慢，但效果不错。
  // 您可以在部署期间从构建中排除* .map文件。
  // devtool: shouldUseSourceMap ? 'source-map' : false,
  // 在生产中，我们只想加载polyfills和应用程序代码。
  // 下面entry对象必须在下面webpack.optimize.CommonsChunkPlugin 中引用，否则无效
  entry: {
    //公共组件入口
    dll: vendors,
    // components: components,
    // components:components
  },
  // 排除不打包的依赖包
  externals: {},
  output: {
    // 构建文件夹。
    path: paths.appDll,
    // 生成的JS文件名（带有嵌套文件夹）。
    // 将有一个主要的bundle，每个异步块有一个文件。
    // 我们目前没有宣传代码分割，但Webpack支持它。
    filename: "[name].js",
    chunkFilename: "[name].js",
    // 从主页推断出“公共路径”（如/或/ my-project）。
    publicPath: "/",
    library: '[name]',
    // 将sourcemap条目指向原始磁盘位置（格式为Windows上的URL）
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },

  module: {
    strictExportPresence: true,
    rules: [{
      // 使用Babel处理JS资源
      test: /\.(js|jsx|tsx)$/,
      enforce: "pre",
      include: [paths.appSrc, paths.appComponents],
      loader: require.resolve("babel-loader"),
      options: {}
    }, ]
  },
  plugins: [
    // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
    // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
    // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
    // new FaviconsWebpackPlugin(paths.appFavicon),
    // 使一些环境变量可用于JS代码，例如：
    // if（process.env.NODE_ENV ==='production'）{...}。
    // 这里绝对必要NODE_ENV被设置为生产。
    // 否则，React将以非常缓慢的开发模式进行编译。
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 在Webpack v3新引进的。使用简单，效果不错。
    // 范围提升特别是ECMAScript Module语法实现的功能。
    // 因为这个webpack可以根据你正在使用什么样的模块和其他条件来回退到正常的捆绑。
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 打包过程中，最小化id值。在Webpack v2.0以及以后的版本默认添加。
    // new webpack.optimize.OccurrenceOrderPlugin()
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: shouldUseSourceMap
    }),
  ],
  // 有些库导入Node modules，但不要在浏览器中使用它们。
  // 告诉Webpack为他们提供空的mock，以便导入它们。
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};