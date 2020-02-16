import Vue from 'vue'
import VueRouter from 'vue-router'

const login = () => import('@/views/login/Login')
const home = () => import('@/views/home/Home')
const homeWelcome = () => import('@/views/home/HomeWelcome')
const userList = () => import('@/views/home/user/UserList')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: homeWelcome
      },
      {
        path: '/user',
        component: userList
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login')  return next()

  //获取token
  const token = window.sessionStorage.getItem('token');
  if(!token) return next('/login')
  next()
})

export default router
