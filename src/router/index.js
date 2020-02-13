import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/home/Home')
const homeWelcome = () => import('@/views/home/HomeWelcome')
const userList = () => import('@/views/home/user/UserList')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
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

export default router
