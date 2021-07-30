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

// 获取角色列表数据
export function getRolesList() {
  return request({
    url:'roles',
  })
}

// 添加角色
export function addRoles(config) {
  return request({
    url:'roles',
    method:'POST',
    data:config
  })
}


// 修改角色列表数据
export function changeRolesList(config) {
  return request({
    url:`roles/${config.roleId}`,
    method:'PUT',
    data:{
      roleName:config.roleName,
      roleDesc:config.roleDesc
    }
  })
}

// 根据ID获取具体角色数据
export function getRoles(id) {
  return request({
    url:`roles/${id}`,
  })
}

// 删除角色
export function delRoles(id) {
  return request({
    url:`roles/${id}`,
    method:'DELETE',
    
  })
}