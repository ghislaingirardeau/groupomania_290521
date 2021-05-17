<template>
    <div id="UpdateComment">

      <label for="update_comment" class="col-12">Changer ci-dessous votre commentaire :</label>
      <textarea id="update_comment" name="update_comment" v-model="update.comment" :placeholder="user_comment" 
      class="col-12" cols="10" rows="3" ></textarea>
      <button class="btn btn-orange btn-lg mt-4" @click="modifyComment">Changer</button>
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
  },
})
</script>
