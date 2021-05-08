import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sujet from '../views/sujet.vue'

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/sujet/:topicid',
    name: 'sujet',
    component: Sujet
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
