import { request } from "./request";

// 获取侧边菜单列表数据
export function getMenuList() {
    return request({
      url:'menus'
    })
}

//获取用户列表数据
export function getUserList(config) {
    return request({
      url:'users',
      params:config
    })
}
// 修改用户状态数据
export function changeUserState(config) {
  return request({
    url:`users/${config.id}/state/${config.state}`,
    method:'PUT'
  })
}