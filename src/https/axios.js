/**
 * 传入对象
 * {
 * url:'',
 * type:'POST' |'GET'|'PUT',
 * data:'',
 * loading:true | false
 * }
 */
import axios from 'axios';
import {
  Message,
  Loading
} from 'element-ui';

let env = process.env.NODE_ENV;
let root = '';
if (env === 'development') {
  root = 'apis';
} else if (env === 'production') {
  root = '';
} else {
  throw '请检查process.env.NODE_ENV的值，是否符合这些值之一：development，production';
}


const apiAxios = (options) => {
  let loadingInstance = Loading.service({
    fullscreen: true,
    text: '加载中...'
  });
  //请求拦截(必须放在配置axios前面)
  axios.interceptors.request.use(config => {
    return config;
  }, error => {
    // 请求错误回调
    loadingInstance.close();
    Promise.reject(error)
  });
  //响应拦截(必须放在配置axios前面)
  axios.interceptors.response.use(response => {
    console.log("响应拦截")
    return response;
  }, error => {
    let msg = '请求失败!';
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          msg = '错误请求';
          break;
        case 401:
          msg = '未授权,请重新登录';
          break;
        case 403:
          msg = '拒绝访问';
          break;
        case 404:
          msg = '请求错误,未找到该资源';
          break;
        case 500:
          msg = '服务器错误';
          break;
        case 501:
          msg = "网络未实现";
          break;
        case 502:
          msg = "网络错误";
          break;
        case 503:
          msg = "服务不可用";
          break;
        case 504:
          msg = "网络超时";
          break;
        default:
          break;
      }
      Message.error(msg);
    } else {
      Message.error('连接到服务器失败')
    }
    return Promise.resolve(error.response);
  })


  return new Promise((resolve, reject) => {
    //配置axios
    let apiData = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      method: options.type ? options.type : 'GET',
      url: options.url,
      baseURL: `/${root}`,
      withCredentials: true, //跨域请求时发送cookie
      timeout: 5000, //过期时间
    };
    if (options.type === 'GET' || options.type === 'get' || !options.type) {
      apiData['params'] = options.data;
    } else {
      apiData['data'] = options.data;
    }
    axios(
      apiData
    ).then(response => {
      loadingInstance.close();
      resolve(response.data)
    }).catch(err => {
      loadingInstance.close();
      reject(err);
    });
  })

}

export default apiAxios;