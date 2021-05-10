<template>
  <section id="subject">
      <header>
        <h1>{{Subject.topic}}</h1>
        <p>Sujet créé par {{Subject.username}}</p>
      </header>

      <p v-if="commentLength === 0">Il n'y a aucun commentaire fait sur ce sujet</p>

      <article v-for="item in Topic.comments" :key="item.commentId">
        <h2>{{item.user_comment}}</h2>
        <p>Envoyé par {{item.username}} le {{item.date_comment}}</p>
      </article>
  </section>
</template>

<script>

export default {
  name: 'subject',
  data () {
    return {
      Topic: {},
      Subject: {},
      commentLength: null
    }
  },
  methods: {
    elt() {
      return console.log(this.Topic.comments)
    }
  },
  props: {
    id: {
    type: Number,
    required: true,
    },
  },
  mounted (){
    var token = sessionStorage.getItem('token')
    /* var userid = sessionStorage.getItem('userId') */
    fetch("http://localhost:3000/api/sujet/" + this.id, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + token
      }
    })
    .then (res => res.json())
    .then(data => {
      this.Topic = data
      this.Subject = data.subject[0]
      this.commentLength = data.comments.length
      })
    
    .catch(() => console.log({message: "connexion impossible"}))
  },
}
</script>