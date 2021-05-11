import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import Home from '../views/home.vue'
import Topic from '../views/topic.vue'
import Comment from '../views/comment.vue'

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
      const id = Number.parseInt(route.params.id); /* je t'envoie en params un nombre et ce nombre sera stocké dans la props id */
      return { id }
    },
  },
  {
    path: '/sujet/:topicid/:commentId',
    name: 'Comment',
    component: Comment,
    props: (route) => {
      const topicid = Number.parseInt(route.params.topicid);
      const commentId = Number.parseInt(route.params.commentId);
      return { topicid, commentId }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
