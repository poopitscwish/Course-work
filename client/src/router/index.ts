import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from "@/views/Register.vue"
import Home from "@/views/Home.vue"
import Staff from "@/views/Staff.vue"
import Schedule from "@/views/Schedule.vue"
import Total from "@/views/Total.vue"
import Test from "@/views/Test.vue"
import Order from "@/views/Order.vue"
const routes: Array<RouteRecordRaw> = [
  {path:'/',component:Home},
  {path:'/register',component:Register},
  {path:'/login',component:Login},
  {path:'/staff',component:Staff},
  {path:'/schedule',component:Schedule},
  {path:'/total',component:Total},
  {path:'/order',component:Order},
  {path:'/test',component:Test},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
