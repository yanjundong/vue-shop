import {request} from "./request";

/*登陆的请求*/
export function checkLogin(data) {
  return request({
    method: 'post',
    url: '/login',
    data: data
  })
}