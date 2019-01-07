import axios from "axios";
import { Toast, Dialog } from "vant";
import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["X-Token"] = store.getters.token;
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.error_code !== 1) {
      //1001:验证失败; 1002:授权过期; 1004:其他客户端登录了;
      if (
        res.error_code === 1001 ||
        res.error_code === 1002 ||
        res.error_code === 1004
      ) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        Dialog.confirm({
          message: "你已被登出，可以取消继续留在该页面，或者重新登录",
          title: "确定登出"
        }).then(() => {
          store.dispatch("FedLogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      } else {
        Toast.fail(res.message);
      }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Toast.fail(error.message);
    return Promise.reject(error);
  }
);

export default service;
