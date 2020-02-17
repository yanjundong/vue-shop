import Vue from 'vue'
import VueRouter from 'vue-router'

const login = () => import('@/views/login/Login')
const home = () => import('@/views/home/Home')
const homeWelcome = () => import('@/views/home/HomeWelcome')
const userList = () => import('@/views/home/user/UserList')
const rightList = () => import('@/views/home/rights/RightList')
const roleList = () => import('@/views/home/rights/RoleList')
const goods = () => import('@/views/home/goods/Goods')
const params = () => import('@/views/home/goods/Params')
const categories = () => import('@/views/home/goods/Categories')
const orders = () => import('@/views/home/order/Orders')
const reports = () => import('@/views/home/reports/Reports')

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
        path: '/users',
        component: userList
      },
      {
        path: '/roles',
        component: roleList
      },
      {
        path: '/rights',
        component: rightList
      },
      {
        path: '/goods',
        component: goods
      },
      {
        path: '/params',
        component: params
      },
      {
        path: '/categories',
        component: categories
      },
      {
        path: '/orders',
        component: orders
      },
      {
        path: '/reports',
        component: reports
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
