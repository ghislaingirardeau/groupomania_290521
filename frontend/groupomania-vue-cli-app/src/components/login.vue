<template>
    <article id="login">
      <h2>Login</h2>
      <form action="Accueil">
        <label for="login">Username</label>
        <input for="login" type="text" v-model="post.username"> <!-- copie les données dans le data post  -->
        <label for="login">Password</label>
        <input for="login" type="password" v-model="post.password"> <!-- copie les données dans le data post  -->
        <input type="submit" value="Envoyer !" @click="postLogin">
      </form>
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
          .then (res => res.json())
          .then(data => { /* envoie le token et le id dans la session storage pour recup sur la page home */
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            })
          .catch(() => console.log({message: "erreur de connexion"}))
        },
    },
}
</script>

