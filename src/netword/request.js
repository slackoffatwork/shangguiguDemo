
import axios from "axios";
// 引入进度条 || 样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
// 引人store获取uuid
import store from "@/store";
// 二次封装axios
const requsets = axios.create({
  // 设置默认前缀
  baseURL: '/api',
  // 超时时间
  timeout: 5000
})

// 请求拦截器
requsets.interceptors.request.use((config) => {
  // 判断未登录用请求头带走临时token令牌
  if(store.state.detail.uuid_token){
    // userTempId 保障后端有接收字段 知识点:通过请求头把用户身份信息传递到服务器
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if(store.state.loginHregister.token){
    config.headers.token = store.state.loginHregister.token
  }
  // 进度条开始
  nprogress.start();
  return config
})
// 响应拦截器
requsets.interceptors.response.use((res)=>{
  // 进度条结束
  nprogress.done();
  
  return res.data
},(error)=>{
  return Promise.reject(new Error('失败'))
})

export default requsets