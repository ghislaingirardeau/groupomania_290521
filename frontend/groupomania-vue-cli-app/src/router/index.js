import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import Home from '../views/home.vue'
import Topic from '../views/topic.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Accueil',
    name: 'Home',
    component: Home
  },
  {
    path: '/sujet/:id',
    name: 'Topic',
    component: Topic,
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
