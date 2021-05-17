<template>

    <div id="Signup" class="mt-5">

      <h2 class="col-12 mb-2">Remplissez le formulaire pour vous insrcire :</h2>

      <form action="/Accueil">

      <label for="signup" class="col-12 mt-4">Mon pseudo</label>
      <input for="signup" type="text" class="col-12 col-md-6" maxlength="40" required v-model="post.username" > <!-- copie les données dans le data post  -->
        
      <label for="signup" class="col-12 mt-4">Mon adresse email</label>
      <input for="signup" type="email" class="col-12 col-md-6" required v-model="post.email"> <!-- copie les données dans le data post  -->
        
      <label for="signup" class="col-12 mt-4">Mot de passe (minimum 6 caractères)</label>
      <input for="signup" type="password" class="col-12 col-md-6" minlength="6" required v-model="post.password"> <!-- copie les données dans le data post  -->
      
      <div class="col-12">
      <input type="submit" value="Envoyer" class="btn btn-primary btn-lg mt-4" @click="postSignup">
      <p class="message__serveur">{{errorMessage}}</p>
      </div> 
      </form>

    </div>

</template>

<script>
export default {
  name: "Signup",
  data () {
    return {
      post: {
        username: '',
        email: '',
        password: '',
      },
      errorMessage: null
    }
  },
  methods: {
    postSignup() {
      if (this.post.username != '' && this.post.email != '' && this.post.password != '') {
        fetch("http://localhost:3000/api/compte/signup", {
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
            })
          } else { /* sinon j'envoie une erreur */
            res.json()
            .then(data => {
              this.errorMessage = data.message /* renvoie error du backend sur le frontend */
            })
          }
        })
        .catch(() => console.log({message: "erreur de connexion"}))
      } else {
        this.errorMessage = "Tous les champs doivent etre saisie"
      }
    },
  },
}
</script>