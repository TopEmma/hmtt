import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
// 懒加载
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const Mine = () => import('@/views/Mine')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'mine', component: Mine },
      { path: 'mine', component: Mine, name: 'mine' }
    ]
  },
  {
    path: '/login', component: Login
  },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

export default router
