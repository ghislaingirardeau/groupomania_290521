import { createRouter, createWebHistory } from 'vue-router'
import Account from '../views/account.vue'
import Home from '../views/Home.vue'
import Subject from '../views/subject.vue'

const routes = [
  {
    path: '/',
    name: 'Account',
    component: Account
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/sujet/:id',
    name: 'subject',
    component: Subject,
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
