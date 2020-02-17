import {request} from "./request";

//请求菜单列表
export function getMenuList() {
  return request({
    url: '/menus'
  })
}

//用户数据列表
export function getUsers(params) {
  return request({
    method: 'get',
    url: '/users',
    params: params
  })
}

//添加用户
export function addUser(data) {
  return request({
    method: 'post',
    url: '/users',
    data: data
  })
}

//修改用户状态
export function editState(data) {
  return request({
    method: 'put',
    url: '/users/' + data.uId + '/state/' + data.type
  })
}

//编辑用户
export function editUser(data) {
  return request({
    method: 'put',
    url: '/users/data.id',
    data: data
  })
}

//删除用户
export function deleteUser(id) {
  return request({
    method: 'delete',
    url: '/users/' + id
  })
}