import { request } from './request'
  // 获取登录状态
export function getUser(config) {
  return request({
    url:'login',
    // params:{
    //   username:config.username,
    //   password:config.password
    // }
    params:config
  })
}