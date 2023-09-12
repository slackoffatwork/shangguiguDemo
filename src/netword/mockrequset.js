import axios from "axios";
// 引入进度条 || 样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
// 二次封装axios
const mockrequsets = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器
mockrequsets.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start();
  return config
})
// 响应拦截器
mockrequsets.interceptors.response.use((res)=>{
  // 进度条结束
  nprogress.done();
  return res.data
},(error)=>{
  return Promise.reject(new Error('失败'))
})

export default mockrequsets