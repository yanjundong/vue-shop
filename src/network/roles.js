import {request} from "./request";

/*获取角色列表*/
export function getRoles() {
  return request({
    method: 'get',
    url: '/roles'
  })
}

/*获取权限树的数据*/
export function getTree() {
  return request({
    method: 'get',
    url: '/rights/tree'
  })
}

/*权限授权*/
export function allowRights(data) {
  return request({
    method: 'post',
    url: '/roles/' + data.id +'/rights',
    data: data.data
  })
}