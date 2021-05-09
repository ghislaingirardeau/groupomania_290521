<script>
export default {
    name: "Addsubject",
    data () {
        return {
          post: {
            user_id: "14",
            topic: null
          }
        }
    },
    methods: {
        postSubject() { 
          fetch("http://localhost:3000/api/sujet/", {
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

<template>
    <article>
      <h2>Créer un sujet</h2>
      <form action="home">
      <label for="subject">Nouveau sujet</label>
      <input for="subject" type="text" v-model="post.topic">
      <input type="submit" value="Envoyer !" @click="postSubject">
      </form>
    </article>
</template>