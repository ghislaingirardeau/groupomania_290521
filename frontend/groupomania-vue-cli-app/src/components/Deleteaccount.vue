<template>

    <article>

      <h2>Supprimer mon compte</h2>

      <label for="delete">Username</label>
      <input for="delete" type="text" v-model="post.username"> 
        
      <label for="delete">email</label>
      <input for="delete" type="email" v-model="post.email"> 
        
      <label for="delete">Password</label>
      <input for="delete" type="password" v-model="post.password"> 
      
      <button @click="deleteAccount">Supprimer !</button>
      <p>{{serverMessage}}</p>

    </article>

</template>

<script>
export default {
  name: "Addsubject",
  data () {
      return {
        post: {
          username: '',
          email: '',
          password: '',
        },
        serverMessage: null
      }
  },
  methods: {
        
    deleteAccount() { 
      var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */

      fetch("http://localhost:3000/api/compte/remove", {
        method: 'DELETE',
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
          window.open('/', '_self')
          })
        } else { /* sinon j'envoie une erreur */
          console.log({message: "Erreur lors de la suppression du compte"})
          this.serverMessage = "Erreur lors de la suppression du compte"
        }
      })
      .catch(() => console.log({message: "connexion impossible"}))
    } 
  },
}
</script>

