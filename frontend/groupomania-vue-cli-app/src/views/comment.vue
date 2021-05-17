<template>
    <div id="ManageComment">

      <nav>
      <router-link :to="{name: 'Home'}" class="nav_link_display">Accueil</router-link> | 
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
