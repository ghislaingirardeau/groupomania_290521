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
    path: '/sujet/:id',
    name: 'sujet',
    component: Sujet,
    props: (route) => {
      const id = Number.parseInt(route.params.id);
      return { id }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
