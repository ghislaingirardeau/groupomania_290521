<template>

    <div id="login" class="row, mt-5">
      
      <label for="login" class="col-2">Username</label>
      <input for="login" type="text" class="col-4" v-model="post.username"> <!-- copie les données dans le data post  -->
      
      <label for="login" class="col-2" >Password</label>
      <input for="login" type="password" class="col-4" v-model="post.password"> <!-- copie les données dans le data post  -->
      
      <button class="col-2, mt-3" @click="postLogin">Envoyer</button>
      <p>{{errorMessage}}</p>

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

