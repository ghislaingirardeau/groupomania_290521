<template>
    <article id="Signup">
      <h2>Signup</h2>
      <form action="Accueil">
        <label for="login">Username</label>
        <input for="login" type="text" v-model="post.username"> <!-- copie les données dans le data post  -->
        <label for="login">email</label>
        <input for="login" type="email" v-model="post.email"> <!-- copie les données dans le data post  -->
        <label for="login">Password</label>
        <input for="login" type="password" v-model="post.password"> <!-- copie les données dans le data post  -->
        <input type="submit" value="Envoyer !" @click="postSignup">
      </form>
    </article>
</template>

<script>
export default {
    name: "Signup",
    data () {
        return {
          post: {
            username: null,
            email: null,
            password: null,
          },
        }
    },
    methods: {
        postSignup() { 
          fetch("http://localhost:3000/api/compte/signup", {
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
          .catch(error => console.log(error))
        },
    },
}
</script>