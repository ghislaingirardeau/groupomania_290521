<template>

  <article>

    <h2>Ajouter un commentaire</h2>

    <label for="Comment">Nouveau commentaire</label>
    <input for="Comment" type="text" v-model="post.comment">
    
    <button @click="postComment">Publier</button>
    <p>{{serverMessage}}</p>

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
      .then (res => res.json())
      .then (data=> {
        this.serverMessage = data.message
        window.open('/sujet/' + this.topicid, '_self')
      })
      .catch(() => console.log({message: "connexion impossible"}))
    } 
  },
}
</script>

