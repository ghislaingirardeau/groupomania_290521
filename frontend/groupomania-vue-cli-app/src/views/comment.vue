<template>
    <article id="Updatecomment">
      <h2>modifer mon commentaire</h2>

      <label for="subject">Nouveau commentaire</label>
      <input for="subject" type="text" v-model="update.comment">
      <a :href="'http://localhost:8080/sujet/' + topicid" @click="modifyComment">Envoi</a>


    </article>
    
</template> 

<script>
export default ({ /* AJOUTER UN SECURITE POUR LE CONTROLE DE USERID MATCH en front??  */
  
  name: "Updatecomment",
  data () {
      return {
        update: {
          user_id: null,
          comment: null
        }
      }
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
  methods: {
        modifyComment() { 
          var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
          this.update.user_id = sessionStorage.getItem('userId')
           /* envoie le userid dans le put */

          fetch("http://localhost:3000/api/sujet/" + this.id + "/" + this.commentId, {
            method: 'PUT',
            headers: {
              "content-type": "application/json",
              "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify(this.update)
          })
          .then (res => res.json())
          .catch(() => console.log({message: "connexion impossible"}))
        } 
    },
  
})
</script>
