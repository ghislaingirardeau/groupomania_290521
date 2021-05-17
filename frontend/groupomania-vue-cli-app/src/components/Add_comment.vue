<template>

  <article class="row mt-5 d-flex justify-content-center comment__view--colors">

    <h2 class="col-12 mb-4">Ajouter un commentaire</h2>

    <label for="Comment" class="col-12">Saisser votre commentaire ci-dessous:</label>
    <textarea name="Comment" id="Comment" v-model="post.comment" class="col-12" cols="30" rows="5"></textarea>
    
    <button class="btn btn-primary btn-lg mt-4" @click="postComment">Publier</button>
    <p class="message__serveur col-12">{{serverMessage}}</p>

  </article>

</template>

<script>
export default {
  name: "AddComment",
  data () {
      return {
        post: {
          user_id: null,
          comment: null
        },
        serverMessage: null
      }
  },
  props: {
    user: Number,
    topicid: { /* recupere id du topic qui est dans l'url */
      type: Number,
      required: true,
    },
  },
  methods: {
      
    postComment() { 
      var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
      this.post.user_id = this.user /* envoie le userid dans le post */
          
      fetch("http://localhost:3000/api/sujet/" + this.topicid, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(this.post)
      })
      .then (res => {
        if(res.ok) { /* si reponse est ok, je recupere le data */
          res.json()
          .then (data => {
          this.serverMessage = data.message
          window.open('/sujet/' + this.topicid, '_self')
          })
        } else { /* sinon j'envoie une erreur */
          console.log({message: "Ajout du commentaire impossible"})
          this.serverMessage = "Erreur lors de l'ajout du commentaire"
        }
      })
      .catch(() => console.log({message: "connexion impossible"}))
    } 
  },
}
</script>

