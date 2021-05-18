<template>

  <section id="Topic" class="container">

    <header>
      <img src="@/assets/Logo/icon-left-font.svg" alt="logo_groupomania" id="logo_home" class="mt-n5 mb-n5 w-25"/>
      <h1 class="col-12 mt-lg-n5">Bienvenue sur notre forum</h1>
      <a href="/" @click="disconnect" class="nav_link_display">Se déconnecter</a>
    </header>

    <nav class="row d-flex justify-content-around mt-3">
      <router-link :to="{name: 'topics'}" class="nav_link_display">Accueil</router-link>
    </nav>

    <div class="col-12 mt-3 pt-3 row comment__view--colors">
      <h1 class="col-9 text-left">{{Subject.topic}}</h1>
      <p class="col-3 pt-3">créé par {{Subject.username}}</p>
    </div>

    <div class="row d-flex justify-content-around mt-4 comment--layout">

      <p class="pt-3 nocomment--bold" v-if="commentLength === 0">Il n'y a pas encore de commentaires faits sur ce sujet</p> <!-- renvoie un template specifique si pas de commentaire -->

      <article class="col-11 row d-flex justify-content-between mt-3 mb-3 text-left pt-4" v-for="item in Comments.comments" :key="item.commentId" id="comment">
        <p class="col-12 comment--layout--font">{{item.user_comment}}</p>
        <p class="col-9 comment--layout--by">Envoyé par {{item.username}} {{item.Date}}</p>
        
        <button v-if="user_id === item.user_id || userRole === 'admin'" class="col-3 text-center" @click="manageComment">Modifier</button>
        <!-- Je verifie le userid pour faire correspondre si celui-ci a les droit ou non, envoie le topicId et commentId dans le router pour la modif du commentaire -->
        
        <!-- COMMENT MANAGEMENT -->
        <div v-show="manageShow && user_id === item.user_id">
          <!-- MODIF BOUTON -->
          <updatecomment :topicid="topicid" :commentId="item.commentId" :user_comment="item.user_comment" />     
          <!-- DELETE BOUTON -->
          <deletecomment :topicid="topicid" :commentId="item.commentId"/>
        </div> <!--   -->

      </article>
    </div>

    <aside> 
    <Addcomment :user='user_id' :topicid="topicid"/> <!-- composant pour l'ajout de sujet -->
    </aside>

  </section>

</template>

<script>
import Addcomment from '../components/Add_comment.vue'
import deletecomment from '../components/delete_comment.vue'
import updatecomment from '../components/update_comment.vue'

export default {
  name: 'Topic',
  data () {
    return {
      Comments: {},
      Subject: {},
      commentLength: null,  /* renvoie un template specifique si pas de commentaire */
      user_id: Number,
      userRole: sessionStorage.getItem('role'),
      manageShow: false,
    }
  },
  methods: {
    disconnect(){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('role')
    },
    manageComment(){
      this.manageShow = true
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
    deletecomment,
    updatecomment
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

<style> /* style propre aux comments */
.comment__view--colors{
  color: #2f353a;
}
.comment--layout {
  background-color: rgb(248, 152, 114);
  border-radius: 10px 10px;
  box-shadow: #2f353a 5px 5px 5px;
  color: #2f353a;
}
.comment--layout--font {
  font-weight: 600;
  color: #2f353a;
  font-size: 1.2rem;
  font-style: italic;
}
.comment--layout--by {
  color: #2f353a;
  font-size: 1rem;
  font-style: italic;
}
#comment{
  background-color: white;
  border-radius: 10px 10px;
  box-shadow: #2f353a 5px 5px 5px;
}
.nocomment--bold{
  font-weight: bold;
}
</style>