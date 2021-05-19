<template>

    <article class="row mt-5">

      <h2 class="col-12 mb-4">Ajouter ici le sujet de discussion de votre choix:</h2>
      
      <form action="/Accueil" class="col-12">
      
        <label for="topic" class="col-12">Le sujet doit contenir moins de 100 caractères !</label>
        <input for="topic" id="topic" type="text" class="col-12 col-xl-6" maxlength="100" 
        v-model="post.topic" required>
      
        <div class="col-12">
          <input type="submit" value="Publier ce sujet" class="btn btn-orange btn-lg mt-4" @click="postSubject">
          <p class="message__serveur col-12">{{serverMessage}}</p>
        </div>

      </form>

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
  methods: {
        
    postSubject() { 
      var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
      this.post.user_id = sessionStorage.getItem('userId') /* envoie le userid dans le post */

      fetch("http://localhost:3000/api/sujet/", {
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
          })
        } else { /* sinon j'envoie une erreur */
          this.serverMessage = "Ajout du sujet impossible"
        }
      })
      .catch(() => console.log({message: "connexion impossible"}))
    } 
  },
}
</script>

