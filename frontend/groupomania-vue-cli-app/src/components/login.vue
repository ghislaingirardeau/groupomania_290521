<template>

  <div id="login" class="row, mt-5">

    <h2 class="col-12 mb-2">Veuillez vous identifier :</h2>

    <label for="pseudo" class="col-12 mt-4">Mon pseudo</label>
    <input for="pseudo" id="pseudo" type="text" class="col-12 col-md-6" v-model="post.username" required> <!-- copie les données dans le data post  -->
      
    <label for="password" class="col-12 mt-3" >Mot de passe</label>
    <input for="password" id="password" type="password" class="col-12 col-md-6" v-model="post.password" required> <!-- copie les données dans le data post  -->
      
    <div class="col-12">
      <button class="btn btn-orange btn-lg mt-4" @click="postLogin">Envoyer</button>
      <p class="message__serveur col-12">{{errorMessage}}</p>
    </div>


    <p>Si vous n'avez pas de compte cliquer sur "s'inscrire"</p>

  </div>

</template>

<script>
export default {
  name: "login",
  data () {
    return {
      post: {
        username: null,
        password: null
      },
      errorMessage: null
    }
  },
  methods: {
    postLogin() { 
      fetch("http://localhost:3000/api/compte/login", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        },
      body: JSON.stringify(this.post)
      })
      .then (res => {
        if(res.ok) { /* si reponse est ok, je recupere le data */
          res.json()
          .then (data => {
            /* envoie le token et le id dans la session storage pour recup sur la page home */  
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            sessionStorage.setItem('username', data.username)
            sessionStorage.setItem('role', data.role)
            window.open('/Accueil', '_self')
          })
        } else { /* sinon j'envoie une erreur */
          res.json()
          .then(data => {
            this.errorMessage = data.message /* renvoie error du backend sur le frontend */
          })
        }
      })
      .catch(() => console.log({message: "erreur de connexion"}))
    },
  },
}
</script>

