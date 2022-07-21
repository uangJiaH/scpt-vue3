import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [{
      path: '/404',
      component: () => import('../views/404')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
