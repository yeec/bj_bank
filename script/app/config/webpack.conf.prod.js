//引入所需插件
const autoprefixer = require("autoprefixer");
const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const ManifestPlugin = require("webpack-manifest-plugin");

// Webpack使用`publicPath'来确定应用程序在哪里发送。
const publicPath = paths.servedPath;
// 对于这些，“首页”可以设置为“.”。 以启用相对资产路径。
const shouldUseRelativeAssetPaths = publicPath === "./";
// SourceMap繁重，可能导致大型源文件的内存不足问题。
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

//入口配置文件引入
var entrys = require('../../../app/entrys/config/sample.js');

var productionConfig = {
  // 如果有任何错误，请勿尝试继续。
  bail: true,
  //入口配置
  entry: entrys,
  // 排除不打包的依赖包
  externals: {
    // 'marked': 'marked',
    // 'prismjs': 'prismjs',
    // 'babel-standalone': 'transform'
  },
  output: {
    // 构建文件夹。
    path: paths.appBuild,
    // 生成的JS文件名（带有嵌套文件夹）。
    // 将有一个主要的bundle，每个异步块有一个文件。
    // 我们目前没有宣传代码分割，但Webpack支持它。
    filename: "[name]/index.js",
    publicPath: '../',
    chunkFilename: "[name]/index.js",
    // 将sourcemap条目指向原始磁盘位置（格式为Windows上的URL）
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    // 这允许您设置Webpack应该查找模块的后备。
    // 我们将这些路径放在第二位，因为如果有任何冲突，我们想要“node_modules”来“win”。
    // 这符合节点解析机制。
    modules: ["node_modules", paths.appNodeModules]
      // 它保证存在，因为我们在`env.js`中调整它, process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      .concat(),
    // 添加`web`扩展名前缀，以更好地支持各种组件类型。
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx", ".tsx"],
    alias: {
      // 项目组件目录
      components: paths.appComponents,
      // 项目公共方法目录
      utils: paths.appUtils,
      // API目录
      constants: paths.appConstants
    },
    plugins: [
      // 阻止用户从 src/（或node_modules/）外部导入文件,只通过 babel 处理 app/中的文件。
      new ModuleScopePlugin(paths.appSrc, [paths.appPackage])
    ]
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
      },
      {
        // “oneOf”将遍历所有以下加载程序，直到一个符合要求。当没有加载器匹配时，它将返回到加载程序列表末尾的“file”加载器。
        oneOf: [
          // “url”加载器像“file”加载器一样工作，除了将小于指定限制的资源嵌入数据URL以避免请求。
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          // “postcss-loader”将autoprefixer应用到我们的CSS中。
          // “css-loader”可以解析CSS中的路径，并添加资源作为依赖关系。
          // “style-loader”将CSS转换为注入<style>标签的JS模块。
          // 在生产中，我们使用一个插件将该CSS提取到一个文件，但是在开发中“style-loader”可以对CSS进行热编辑。
          {
            test: /\.(css|less)$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [{
                  loader: "css-loader",
                  //css设置
                  options: {
                    //启用/禁用 css-modules 模式
                    modules: true,
                    //在 css-loader 前应用的 loader 的数
                    importLoaders: 1,
                    //启用/禁用 Sourcemaps
                    sourceMap: true,
                    //导出以驼峰化命名的类名
                    camelCase: false,
                    localIdentName: "[local]"
                    //启用/禁用 压缩
                    // minimize: true
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
                {
                  loader: "less-loader",
                  options: {
                    "modifyVars": {
                      "@hd": "2px",
                    }
                  }
                }
              ]
            })
          },
        ]
      }
    ]
  },
  plugins: [
    // 使一些环境变量可用于JS代码，例如：
    // if（process.env.NODE_ENV ==='production'）{...}。
    // 这里绝对必要NODE_ENV被设置为生产。
    // 否则，React将以非常缓慢的开发模式进行编译。
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // DLL文件配置
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../../../manifest.json'),
      name: 'dll'
    }),
    // 在Webpack v3新引进的。使用简单，效果不错。
    // 范围提升特别是ECMAScript Module语法实现的功能。
    // 因为这个webpack可以根据你正在使用什么样的模块和其他条件来回退到正常的捆绑。
    new webpack.optimize.ModuleConcatenationPlugin(),

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
    // 注意：如果在“loader”中没有ExtractTextPlugin.extract（..），这将不起作用。
    new ExtractTextPlugin({
      filename: '[name]/style.css'
    }),
    // 注意：在这里定义，因为它将被使用不止一次。
    // 生成一个清单文件，其中包含所有资产文件名映射到其相应的输出文件，
    // 以便工具可以拾取它，而无需解析“index.html”。
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    })
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

// entry入口*************************
let entryList = [];
for (var item in entrys) {
  entryList.push(item);
}
// html页面入口-打包压缩*************************
entryList.forEach(function (item) {
  // console.log(item)
  productionConfig.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appBuildHtml,
      filename: item + "/index.html",
      chunks: [item],
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
  )
})
module.exports = productionConfig;