import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL:'http://www.ysqorz.top:8888/api/private/v1/',
    timeout:5000
  })

   // 2.axios的拦截器

  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    // 为请求头对象添加token验证的Authorization的字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    
    return config
  },err=> {

  })

  // 2.2响应拦截
  instance.interceptors.response.use(res=> {
    return res.data
  },err=> {

  })

  //3.发送请求
  return instance(config)
 
}