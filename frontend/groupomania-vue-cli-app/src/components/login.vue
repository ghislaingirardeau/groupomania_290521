<template>
    <article id="login">
      <h2>Login</h2>
      <form action="home">
      <label for="login">Username</label>
      <input for="login" type="text" v-model="post.username">
      <label for="login">Password</label>
      <input for="login" type="text" v-model="post.password">
      <input type="submit" value="Envoyer !" @click="postSubject">
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
          }
        }
    },
    methods: {
        postSubject() { 
          fetch("http://localhost:3000/api/compte/login", {
          method: 'POST',
          headers: {"content-type": "application/json"},
          body: JSON.stringify(this.post)
          })
          .then (res => res.json())
          .catch(() => console.log({message: "connexion impossible"}))
        }
    },
}
</script>

