import { createRouter, createWebHistory } from 'vue-router'
import log from '../views/log.vue'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import Home from '../views/Home.vue'
import allTopics from '../components/all_topics.vue'
import comment from '../views/comment.vue'
import addTopic from '../components/Add_topic.vue'
import account from '../views/account.vue'

const routes = [ /* au clic affichera les vues et composant correspondant, par default renvoie Login(log) et Topics(home) */
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
        path: '', 
        name: 'topics',
        component: allTopics
      },
      {
        path: 'Moncompte',
        name: 'account',
        component: account
      },
      {
        path: 'AjoutSujet',
        name: 'Addtopic',
        component: addTopic
      },
    ]
  },
  {
    path: '/sujet/:topicid(\\d+)', /* (\\d+) = le topicid doit etre un nombre entier */
    name: 'comment',
    component: comment,
    props: (route) => {
      const topicid = Number.parseInt(route.params.topicid); /* je t'envoie en params un nombre et ce nombre sera stocké dans la props topicid */
      return { topicid }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
