<template>
    <div id="UpdateComment" class="row d-flex justify-content-between border-top pt-2">

      <label for="update_comment" class="col-12 comment--layout--by">Changer ci-dessous votre commentaire :</label>
      <textarea id="update_comment" name="update_comment" v-model="update.comment" :placeholder="user_comment" 
      class="col-12 col-lg-7" rows="2" ></textarea>
      <button class="col-8 col-lg-2 btn btn-success btn-lg mt-3 mb-lg-5 btn-border" @click="modifyComment">Valider</button>

      <button class="col-8 col-lg-2 btn btn-danger btn-lg mt-3 mb-lg-5 btn-border" @click="deleteComment">Supprimer</button>

      <p class="message__serveur col-12">{{serverMessage}}</p>

    </div>
    
</template> 

<script>
export default ({ 
  
  name: "UpdateComment",
  data () {
      return {
        update: {
          user_id: null,
          comment: null
        },
        serverMessage: null,
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
    user_comment: {
      type: String,
      required: true,
    }
  },
  methods: {

    modifyComment() { 
      var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
      this.update.user_id = sessionStorage.getItem('userId')
       /* envoie le userid dans le put */

      fetch("http://localhost:3000/api/sujet/" + this.topicid + "/" + this.commentId, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(this.update)
      })
      .then (res => {
        if(res.ok) { /* si reponse est ok, je recupere le data */
          res.json()
          .then (data => {
          this.serverMessage = data.message
          window.open('/sujet/' + this.topicid, '_self')
          })
        } else { /* sinon j'envoie une erreur */
          this.serverMessage = "Vous n'avez pas les droits pour modifier ce commentaire"
        }
      })
      .catch(() => {console.log({message: "modification du commentaire impossible"})})
    },

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
          this.serverMessage = data.message
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
