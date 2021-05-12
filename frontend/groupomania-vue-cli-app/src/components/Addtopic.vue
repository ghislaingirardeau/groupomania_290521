<template>

    <article>

      <h2>Créer un sujet</h2>

      <label for="topic">Nouveau sujet</label>
      <input for="topic" type="text" v-model="post.topic">
      
      <button @click="postSubject">Publier</button>
      <p>{{serverMessage}}</p>

    </article>

</template>

<script>
export default {
  name: "Addsubject",
  data () {
      return {
        post: {
          user_id: null,
          topic: null
        },
        serverMessage: null
      }
  },
  props: { /* recup le user du parent */
    user: String
  },
  methods: {
        
    postSubject() { 
      var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
      this.post.user_id = this.user /* envoie le userid dans le post */

      fetch("http://localhost:3000/api/sujet/", {
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
        window.open('/Accueil', '_self')
      })
      .catch(() => console.log({message: "connexion impossible"}))
    } 
  },
}
</script>

