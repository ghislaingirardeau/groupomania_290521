import { createRouter, createWebHistory } from 'vue-router'
import Compte from '../views/Home.vue'
import Sujet from '../views/sujet.vue'

const routes = [
  {
    path: '/compte',
    name: 'Compte',
    component: Compte
  },
  {
    path: '/sujet',
    name: 'sujet',
    component: Sujet
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
