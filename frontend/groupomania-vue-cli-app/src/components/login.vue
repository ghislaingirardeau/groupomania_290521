<template>

    <article id="login">

      <h2>Login</h2>
      
      <label for="login">Username</label>
      <input for="login" type="text" v-model="post.username"> <!-- copie les données dans le data post  -->
      
      <label for="login">Password</label>
      <input for="login" type="password" v-model="post.password"> <!-- copie les données dans le data post  -->
      
      <button @click="postLogin">Envoyer</button>
      <p>{{errorMessage}}</p>

    </article>
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

