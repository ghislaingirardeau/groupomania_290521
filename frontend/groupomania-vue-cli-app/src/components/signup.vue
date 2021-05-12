<template>

    <article id="Signup">

      <h2>Signup</h2>

      <label for="signup">Username</label>
      <input for="signup" type="text" v-model="post.username"> <!-- copie les données dans le data post  -->
        
      <label for="signup">email</label>
      <input for="signup" type="email" v-model="post.email"> <!-- copie les données dans le data post  -->
        
      <label for="signup">Password</label>
      <input for="signup" type="password" v-model="post.password"> <!-- copie les données dans le data post  -->
        
      <button @click="postSignup">Envoyer</button>
      <p>{{errorMessage}}</p>

    </article>

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
      } else {
        this.errorMessage = "Tous les champs doivent etre saisie"
      }
    },
  },
}
</script>