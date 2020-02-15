import {request} from "./request";

export function getMenuList() {
  return request({
    url: '/home/multidata'
  })
}

//添加用户
export function addUser() {
  console.log('添加用户的网络请求');
}