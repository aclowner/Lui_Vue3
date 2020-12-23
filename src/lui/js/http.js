import axios from "axios";
axios.defaults.timeout = 5000; // 请求超时
axios.defaults.baseURL = process.env.NODE_ENV == "production" ? process.env.VUE_APP_BASE_URL : ""; // 增加请求默认路径前缀

export default {
  /**
   * get 请求
   * @param url 接口路由
   * @returns {AxiosPromise<any>}
   */
  get(options) {
    let ops = {};

    if (options.params) {
      ops.params = options.params;
    }
    if (options.headers) {
      ops.headers = options.headers;
    }
    return axios.get(options.url, options);
  },

  /**
   * post 请求
   *
   * @param url 接口路由
   * @param params 接口参数
   * @returns {AxiosPromise<any>}
   */
  post(options) {
    let ops = {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      ssss:"test"
    };

    if (options.headers) {
      ops.headers = options.headers;
    }
    return axios.post(options.url, options.data, ops);
  }
};


axios.interceptors.request.use(
  config => {
    console.log(1111111111111,config);
    // 1. 这个位置就请求前最后的配置
    // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
 
// 响应拦截
axios.interceptors.response.use(
  response => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据
    console.log(222222222222,response);
    let cf = response.config,
      result = response.data;
    if(cf.format == false)
      return result;
    else{
      if(result.ResultData.Request == undefined || result.ResultData.Request == 0 )
        return result.Data;
      else{
        cf.errHit && Lui.Hit(result.ResultData.ErrMsg);
        return Promise.reject({error:-1,msg:result.ResultData.ErrMsg});
      }
    }
  },
  error => {
    // 请求失败
    if (error && error.response) {
      let errCn = ""
      switch (error.response.status) {
        case 400:
          // 对400错误您的处理
          errCn = "错误请求";
          break;
        case 403:
          // 对 403 错误进行处理
          errCn = "拒绝访问";
          break;
        case 404:
          // 对 404 错误进行处理
          errCn = "请求错误,未找到该资源";
          break;
        case 500:
          // 对 500 错误进行处理
          errCn = "服务器端出错";
          break;
        case 502:
          // 对 502 错误进行处理
          errCn = "网络错误";
          break;
        case 503:
          // 对 503 错误进行处理
          errCn = "服务不可用";
          break;
        case 504:
          // 对 504 错误进行处理
          errCn = "网络超时";
          break;
        default:
          // 如果以上都不是的处理
          return Promise.reject(error);
      }
      
    } 
    else {
      Promise.reject("连接到服务器失败");
    }
  }
);