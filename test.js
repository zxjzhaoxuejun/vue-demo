const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const vConsolePlugin = require("vconsole-webpack-plugin"); // 引入 移动端模拟开发者工具

const isProduction = process.env.NODE_ENV === 'production'

//配置pages多页面获取当前文件夹下的html和js
let path = require('path')
let glob = require('glob')

function getEntry(globPath) {
  let entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    // console.log(entry)
    tmp = entry.split('/').splice(-3);
    pathname = basename; // 正确输出js和html的路径

    var fileIs = glob.sync(entry + tmp[1] + ".html");
    entries[pathname] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
      template: fileIs.length ? 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + ".html" : "public/index.html",
      title: "",
      filename: tmp[1] + ".html",
      chunks: ['chunk-vendors', 'chunk-common', pathname]
    };
  });
  return entries;
}
let objectProject = getEntry('./src/pages/**?/');
let pages = {}
let projectname = process.env.VUE_APP_NODE_TEST == "test" ? process.argv[5] : process.argv[3]; // 获取执行哪个文件
if (!projectname) {
  projectname = "index"; //设置默认打包页面
}
if (isProduction) {
  pages[projectname] = objectProject[projectname]
} else {
  pages = objectProject
}

module.exports = {
  publicPath: process.env.BASE_URL, // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  assetsDir: 'static.' + projectname, // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  productionSourceMap: false, // 打包时不生成.map文件
  pages: pages,
  css: {
    extract: isProduction ? true : false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项 启用 CSS modules for all css / pre-processor files.
    //modules: false,
    loaderOptions: {
      postcss: {
        // 这是rem适配的配置
        /*plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]*/
      },
      sass: {
        prependData: '@import "@/assets/css/util.scss";@import "@/assets/css/variables.scss";' // 全局引入
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      if (process.env.VUE_APP_NODE_TEST != "test") { //生成环境执行，测试环境保留log
        // 上线压缩去除console等信息
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            },
            sourceMap: false,
            parallel: true
          })
        )
      }
      if (process.env.VUE_APP_NODE_TEST == "test") { //测试环境
        //调试
        config.plugins.push(
          new vConsolePlugin({
            filter: [], // 需要过滤的入口文件
            enable: true // 发布代码前记得改回 false
          })
        )
      }
    } else {
      //调试
      config.plugins.push(
        new vConsolePlugin({
          filter: [], // 需要过滤的入口文件
          enable: true // 发布代码前记得改回 false
        })
      )

    }
  },
  chainWebpack: config => {
    // 移除 prefetch preload 插件 按需加载有效
    for (let key in objectProject) {
      config.plugins.delete('prefetch-' + key + '')
      config.plugins.delete('preload-' + key + '');
    }
    // 路径别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
      .set('@public', path.resolve(__dirname, './public'))
      .set('@assets', path.resolve(__dirname, './src/assets'))
      .set('@css', path.resolve(__dirname, './src/assets/css'))
      .set('@img', path.resolve(__dirname, './src/assets/img'))
      .set('@js', path.resolve(__dirname, './src/assets/js'))
      .set('@comps', path.resolve(__dirname, './src/components'))
      .set('@pages', path.resolve(__dirname, './src/pages'))
      .set('@store', path.resolve(__dirname, './src/store'))
      .set('@utils', path.resolve(__dirname, './src/utils'))



  },

  lintOnSave: false, //关闭eslint
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: "0.0.0.0",
    port: 8088, // 服务端口
    https: false,
    hotOnly: false,
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: {
      "/api": {
        target: "http://localhost:9081", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};