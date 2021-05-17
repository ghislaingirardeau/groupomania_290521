<template>

    <article class="row, mt-5">

      <h2 class="col-12 mb-4">La suppression de votre compte est définitive et supprimera tous les sujets et commentaires liés à ce compte !</h2>

      <label for="delete" class="col-12 mt-4">Votre pseudo</label>
      <input for="delete" type="text" class="col-12 col-md-6" required v-model="post.username"> 
        
      <label for="delete" class="col-12 mt-4">Votre adresse email</label>
      <input for="delete" type="email" class="col-12 col-md-6" required v-model="post.email"> 
        
      <label for="delete" class="col-12 mt-4">Votre mot de passe</label>
      <input for="delete" type="password" class="col-12 col-md-6" required v-model="post.password"> 

      <div class="col-12">
      <button class="btn btn-orange btn-lg mt-4" @click="deleteAccount">Supprimer !</button>
      <p class="message__serveur col-12">{{serverMessage}}</p>
      </div> 

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
      var confirmation = window.confirm("Etes-vous sûr de vouloir supprimer votre compte ?") /* Ajoute une alerte pour confirmer la suppression */

      if (confirmation === true) {
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
            this.serverMessage = "Erreur lors de la suppression du compte"
          }
        })
        .catch(() => console.log({message: "connexion impossible"}))

      } else {
        this.serverMessage = "La suppression du compte a été stoppé"
      }
    } 
  },
}
</script>

