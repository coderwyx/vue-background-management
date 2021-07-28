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

// 添加用户数据
export function addUser(config) {
  return request({
    url:'users',
    method:'POST',
    data:config
  })
}

// 查询用户信息
export function checkUserInfo(id) {
  return request({
    url:`users/${id}`,
  })
}

// 修改用户信息
export function changeUserInfo(config) {
  console.log(config);
  return request({
    url:`users/${config.id}`,
    method:'PUT',
    data:{
      email:config.email,
      mobile:config.mobile
    }
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url:`users/${id}`,
    method:'DELETE',
    
  })
}

// 获取所有权限列表
export function getRightsList(type) {
  return request({
    url:`rights/${type}`,
    
  })
}