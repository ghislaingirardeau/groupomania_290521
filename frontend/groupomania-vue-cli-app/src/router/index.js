import { createRouter, createWebHistory } from 'vue-router'
import Compte from '../views/Home.vue'

const routes = [
  {
    path: '/compte',
    name: 'Compte',
    component: Compte
  },
  {
    path: '/sujet',
    name: 'sujet',
    component: () => import('../views/sujet.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
