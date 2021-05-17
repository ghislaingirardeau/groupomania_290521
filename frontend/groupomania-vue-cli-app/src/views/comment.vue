<template>
    <div id="ManageComment" class="container">

      <header>
        <img src="@/assets/Logo/icon-left-font.svg" alt="logo_groupomania" id="logo_home" class="mt-n5 mb-n5 w-25"/>
        <h1 class="col-12 mt-lg-n5">Bienvenue sur notre forum</h1>
        <a href="/" @click="disconnect" class="nav_link_display">Se déconnecter</a>
      </header>

      <nav class="row d-flex justify-content-around mt-3">
      <router-link :to="{name: 'Home'}" class="nav_link_display">Accueil</router-link> 
      <router-link :to="{name: 'Topic'}" class="nav_link_display">Retour sujet</router-link>
      </nav>

      <updatecomment :topicid="topicid" :commentId="commentId" /> <!-- Envoie les props dans le composant -->      

      <deletecomment :topicid="topicid" :commentId="commentId" class="border-top border-danger pt-4"/>

    </div>
    
</template> 

<script>
import deletecomment from '../components/delete_comment.vue'
import updatecomment from '../components/update_comment.vue'

export default ({ /* AJOUTER UN SECURITE POUR LE CONTROLE DE USERID MATCH en front??  */
  
  name: "ManageComment",
  
  components: {
    deletecomment,
    updatecomment
  },
  props: { /* recupere les props soient les parametres de la route defini dans la route de index */
    topicid: {
    type: Number,
    required: true,
    },
    commentId: {
    type: Number,
    required: true,
    },
  },
})
</script>
