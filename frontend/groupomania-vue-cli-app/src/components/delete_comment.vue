<template>
    <div id="DeleteComment">

      <button class="btn btn-danger btn-lg" @click="deleteComment">Supprimer</button>
      <p class="message__serveur col-12">{{deleteMessage}}</p>

    </div>
    
</template> 

<script>
export default ({ /* AJOUTER UN SECURITE POUR LE CONTROLE DE USERID MATCH en front??  */
  
  name: "DeleteComment",
  data () {
      return {
        update: {
          user_id: null,
          comment: null
        },
        deleteMessage: null
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
        
    deleteComment() { 
      var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
      this.update.user_id = sessionStorage.getItem('userId')
       /* envoie le userid dans le delete */
       
      fetch("http://localhost:3000/api/sujet/" + this.topicid + "/" + this.commentId, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify({user_id: this.update.user_id})
      })
      .then (res => {
        if(res.ok) { /* si reponse est ok, je recupere le data */
          res.json()
          .then (data => {
          this.deleteMessage = data.message
          window.open('/sujet/' + this.topicid, '_self')
          })
        } else { /* sinon j'envoie une erreur */
          console.log({message: "supprimer du commentaire impossible"})
          this.serverMessage = "Vous n'avez pas les droits pour supprimer ce commentaire"
        }
      })
      .catch(() => console.log({message: "suppression du commentaire impossible"}))
    }  
  },
})
</script>
