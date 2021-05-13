import { createRouter, createWebHistory } from 'vue-router'
import log from '../views/log.vue'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import Home from '../views/home.vue'
import Topic from '../views/topic.vue'
import Addtopic from '../components/Add_topic.vue'
import Comment from '../views/comment.vue'
import account from '../views/account.vue'

const routes = [
  {
    path: '/',
    name: 'log',
    component: log,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login
      },
      {
        path: 'Signup',
        name: 'Signup',
        component: Signup
      },
    ],
  },
  {
    path: '/Accueil',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'Moncompte',
        name: 'account',
        component: account
      },
      {
        path: 'AjoutSujet',
        name: 'Addtopic',
        component: Addtopic
      },
    ]
  },
  {
    path: '/sujet/:topicid',
    name: 'Topic',
    component: Topic,
    props: (route) => {
      const topicid = Number.parseInt(route.params.topicid); /* je t'envoie en params un nombre et ce nombre sera stocké dans la props topicid */
      return { topicid }
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
