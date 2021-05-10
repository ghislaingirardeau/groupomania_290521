<template>
    <article id="login">
      <h2>Login</h2>
      <form action="home">
      <label for="login">Username</label>
      <input for="login" type="text" v-model="post.username">
      <label for="login">Password</label>
      <input for="login" type="text" v-model="post.password">
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
          token: "test"
        }
    },
    methods: {
        postLogin() { 
          fetch("http://localhost:3000/api/compte/login", {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer' + this.token
            },
          body: JSON.stringify(this.post)
          })
          .then (res => res.json())
          .then(data => console.log(data.token))
          .catch(() => console.log({message: "connexion impossible"}))
        }
    },
}
</script>

