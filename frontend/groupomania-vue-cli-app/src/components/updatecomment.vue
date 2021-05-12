<template>
    <div id="ManageComment">

      <h2>Modifer mon commentaire</h2>

      <label for="comment">Nouveau commentaire</label>
      <input for="comment" type="text" v-model="update.comment">

      <button @click="modifyComment">Modifier</button>
      <p>{{serverMessage}}</p>

    </div>
    
</template> 

<script>
export default ({ /* AJOUTER UN SECURITE POUR LE CONTROLE DE USERID MATCH en front??  */
  
  name: "ManageComment",
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
          console.log({message: "modification du commentaire impossible"})
          this.serverMessage = "Vous n'avez pas les droits pour modifier ce commentaire"
        }
      })
      .catch(() => {console.log({message: "modification du commentaire impossible"})})
    },
  },
})
</script>
