import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
  })

  //请求拦截器
  instance.interceptors.request.use(config => {
    //将token设置为请求头
    const token = window.sessionStorage.getItem('token');
    config.headers.Authorization = token;
    return config
  }, err => {
    // console.log(err);
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}