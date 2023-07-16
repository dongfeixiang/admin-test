import axios from "axios";
import { useTokenStore } from "@/store";

const http = axios.create({
  // baseURL: "http://127.0.0.1:8000/",
  timeout: 3000,
  headers: {},
});

// 白名单URL
const freeUrl = ["/api/login/"];

// 请求拦截
http.interceptors.request.use(
  (request) => {
    if (freeUrl.indexOf(request.url) === -1) {
      const tokenStore = useTokenStore()
      request.headers.Authorization = `Token ${tokenStore.token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.log(error.response.status)
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;
