import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { Loading, Notify } from 'quasar'

import router from "@/router"
import ServiceConfig from "@/config/serverConfig";
import { showError } from "@/utils/Notify";
import { SCache } from "@/utils/cache";

const baseConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.MODE === "development" ? ServiceConfig.DEV_BASE_URL : ServiceConfig.PRO_BASE_URL,
  timeout: import.meta.env.MODE === "development" ? ServiceConfig.DEV_TIME_OUT : ServiceConfig.PRO_TIME_OUT,
}

interface CusResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const instance: AxiosInstance = axios.create(baseConfig)

// 请求拦截器
instance.interceptors.request.use(config => {

  // 开启loading
  Loading.show({ message: `正在加载中,请稍等...` })

  // 添加token信息
  if (SCache.get("token")) {
    config.headers!["Authorization"] = `Bearer ${SCache.get("token")}`
  }

  // 添加时间戳
  config.url += `?t=${new Date().getTime()}`
  return config;
},
  error => {
    Loading.show({ message: `请求失败,请联系网站管理员...` })
    console.log(error);
    // 关闭loading
    setTimeout(() => Loading.hide(), 1500);
  });

// 响应拦截器
instance.interceptors.response.use(response => {
  const { code, message } = response.data
  // 关闭loading
  Loading.hide()
  if (code == 200) {
    return response;
  } else {
    return response;
  }
},
  error => {
    console.log(error);
    if (error.response && error.response.status == 401) {
      setTimeout(() => { Loading.hide(); router.push("/login"); }, 1000);
      // if (error.config.url.includes("/login")) {
      //   Loading.hide();
      //   showError("用户名或者密码错误");
      // } else {
      // 关闭loading 跳转到登录页假面
      //   setTimeout(() => { Loading.hide(); router.push("/login"); }, 1000);
      // }
    } else {
      Loading.show({ message: `请求失败,请联系网站管理员...` })
      setTimeout(() => Loading.hide(), 500);
    }
  });


const request = async<T = any>(config: AxiosRequestConfig): Promise<CusResponse<T>> => {
  return new Promise(async (resolve, reject) => {
    const data = await instance.request<CusResponse<T>>(config);
    resolve(data.data);
  });
}

export default request;