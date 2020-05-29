const proxyTargetMap = {
  //配置代理url
  dev: 'https://xxx.xxx.com/',
  test: 'http://47.105.71.81:3306',
  prod: 'http://192.168.11.178:3001'
}

let proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.prod
let publicPath = process.env.NODE_ENV === 'production' ? '/' : '/';

//配置pages多页面获取当前文件夹下的html和js
let path = require('path')
let glob = require('glob')

function getEntry(globPath) {
  let entries = {},
    basename, tmp, pathname;
  glob.sync(globPath).forEach(function (entry) {
    console.log(entry)
    basename = path.basename(entry, path.extname(entry));
    // console.log(entry)
    tmp = entry.split('/').splice(-3);
    pathname = basename; // 正确输出js和html的路径

    var fileIs = glob.sync(entry + tmp[1] + ".html");
    console.log(tmp)
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
let pages = {};
pages = objectProject


module.exports = {
  publicPath: publicPath, // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: true, //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  productionSourceMap: false, // 打包时不生成.map文件
  css: {
    extract: true, //是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, //开启 CSS source maps
    loaderOptions: {}, //css预设器配置项
    requireModuleExtension: true, //启用CSS modules for all css / pre-processor files.
  },
  pages: pages,
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: "0.0.0.0",
    port: 8080, // 服务端口
    https: false, //是否开启https
    hotOnly: false, //是否配置热更新
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: {
      "/api": {
        target: proxyTarget, // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}