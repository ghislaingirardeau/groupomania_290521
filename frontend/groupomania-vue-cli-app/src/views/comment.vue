<template>

  <section id="Comment" class="container comment_view">

    <header>
      <img src="@/assets/Logo/icon-left.png" alt="logo_groupomania" class="img-fluid"/>
      <h1 class="col-12">Bienvenue sur notre forum</h1>
      <deconnexion/>
    </header>

    <nav class="row d-flex justify-content-around mt-3">
      <router-link :to="{name: 'topics'}" class="nav_link_display">Accueil</router-link>
    </nav>

    <section class="row d-flex justify-content-around mt-4 comment--layout">
      
      <header class="col-11 mt-3 pt-3 row resume__topic--white">
        <h2 class="col-12 col-lg-8 text-lg-left">Thématique : {{Subject.topic}}</h2>
        <p class="col-12 col-lg-3 text-lg-right nocomment--bold">créé par {{Subject.username}}</p>
      </header>

      <p class="pt-3 nocomment--bold" v-if="commentLength === 0">
        Il n'y a pas encore de commentaires faits sur ce sujet
      </p> <!-- renvoie un template specifique si pas de commentaire -->

      <article class="col-11 row mt-3 mb-3 text-left pt-4 comment__layout" v-for="item in Comments.comments" :key="item.commentId">
        <h3 class="col-12 col-md-9 comment__layout--font">{{item.user_comment}}</h3>
        <button v-if="user_id === item.user_id || userRole === 'admin'" class="btn btn-orange col-5 col-md-2" @click="manageComment(item.commentId)">Modifier</button>
        <p class="col-12 col-md-12 mt-3 comment__layout--by">Envoyé par {{item.username}} {{item.Date}}</p>
        
        <!-- Je verifie le userid pour faire correspondre si celui-ci a les droit ou non, envoie le topicId et commentId dans le router pour la modif du commentaire -->
        
        <!-- COMMENT: option modify and delete au click, charge le composant ci dessous. -->
        <!-- condition affichage: si showModification true, si userid correspond a utilisateur ou a l'admin et ouvre seulement celui dont le commentid correspond -->
        <div class="col-12" v-show="showModification && (user_id === item.user_id || userRole === 'admin') && commentId === item.commentId"> <!-- Debug ouverture des tous les commentaires -->
          <updatecomment :topicid="topicid" :commentId="item.commentId" :user_comment="item.user_comment" />     
        </div> <!--   -->

      </article>
    </section>

    <aside> 
    <Addcomment :user='user_id' :topicid="topicid"/> <!-- composant pour l'ajout de sujet -->
    </aside>

  </section>

</template>

<script>
import Addcomment from '../components/Add_comment.vue'
import updatecomment from '../components/update_comment.vue'
import deconnexion from '../components/deconnexion.vue'


export default {
  name: 'Comment',
  data () {
    return {
      Comments: {},
      Subject: {},
      commentLength: null,  /* renvoie un template specifique si pas de commentaire */
      user_id: Number,
      userRole: sessionStorage.getItem('role'),
      showModification: false,
      commentId: Number
    }
  },
  methods: {
    manageComment(commentId){ /* passe en parametre id du comment que j'ai cliqué pour ne pas tous les ouvrir */
      this.showModification = !this.showModification
      this.commentId = commentId
    }
  },
  props: { /* Recuperer l'id du topic envoyer en parametre de l'url */
    topicid: {
    type: Number,
    required: true,
    },
  },
  components: {
    Addcomment,
    updatecomment,
    deconnexion
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
      this.Comments = data
      this.Subject = data.subject[0] /* recupere seulement la partie du sujet */
      this.commentLength = data.comments.length /* renvoie un template specifique si pas encore de commentaires */
    })
    .catch(() => console.log({message: "connexion impossible"}))
  },
}
</script>
