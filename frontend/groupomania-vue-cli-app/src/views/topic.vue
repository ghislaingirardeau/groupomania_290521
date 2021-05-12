<template>

  <section id="Topic">

    <nav>
      <router-link to="/Accueil">Accueil</router-link>
    </nav>

    <header>
      <h1>{{Subject.topic}}</h1>
      <p>Sujet créé par {{Subject.username}}</p>
    </header>

    <p v-if="commentLength === 0">Il n'y a pas encore de commentaires fait sur ce sujet</p> <!-- renvoie un template specifique si pas de commentaire -->

    <aside> 
    <Addcomment :user='user_id' :topicid="topicid"/> <!-- composant pour l'ajout de sujet -->
    </aside>

    <article v-for="item in Topic.comments" :key="item.commentId">
      <h2>{{item.user_comment}}</h2>
      <p>Envoyé par {{item.username}} le {{item.date_comment}}</p>
      <a v-if="user_id === item.user_id" :href="'/sujet/' + Subject.topicId + '/' + item.commentId">Modifier</a> 
      <!-- Je verifie le userid pour faire correspondre si celui-ci a les droit ou non, envoie le topicId et commentId dans le router pour la modif du commentaire -->
    </article>

  </section>

</template>

<script>
import Addcomment from '../components/Addcomment.vue'

export default {
  name: 'Topic',
  data () {
    return {
      Topic: {},
      Subject: {},
      commentLength: null,  /* renvoie un template specifique si pas de commentaire */
      user_id: Number
    }
  },
  props: { /* Recuperer l'id du topic envoyer en parametre de l'url */
    topicid: {
    type: Number,
    required: true,
    },
  },
  components: {
    Addcomment
  },
  mounted () {
    var token = sessionStorage.getItem('token')
    this.user_id = parseInt(sessionStorage.getItem('userId'))

    fetch("http://localhost:3000/api/sujet/" + this.topicid, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + token
      }
    })
    .then (res => res.json())
    .then(data => {
      this.Topic = data
      this.Subject = data.subject[0] /* recupere seulement la partie du sujet */
      this.commentLength = data.comments.length /* renvoie un template specifique si pas encore de commentaires */
      })
    
    .catch(() => console.log({message: "connexion impossible"}))
  },
}
</script>