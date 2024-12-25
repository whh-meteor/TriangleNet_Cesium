import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import router from "@/router";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_URL,
  // 超时
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const {isToken=false,dev=false} = config.headers;
    const {token=''}=store.state.userInfo
    if (isToken && !token) {
      // Message({
      //   message: "登录过期，请重新登录",
      //   type: "error",
      // });
      // setTimeout(() => {
      //   router.replace("/login");
      // });
    }
    
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["token"] = token;
    }
    if(dev){
      config.headers["Authorization"] = "Bearer " + '';
      config.headers["token"] = '';
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (!res.data.success) {
      Message({
        message: res.data.message,
        type: "error",
      });
    }

    switch (res.data.message) {
      case "token验证失败":
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
        break;
      default:
        break;
    }

    
    if (res.data.success) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({ message: message, type: "error", duration: 5 * 1000 });
    return Promise.reject(error);
  }
);
window.axios = service
export default service;
