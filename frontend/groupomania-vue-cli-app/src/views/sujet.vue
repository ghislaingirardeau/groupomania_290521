<template>
  <section id="subject">
      <div>
        <h1>{{Subject.topic}}</h1>
        <p>Sujet créé par {{Subject.username}}</p>
      </div>
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
    }
  },
  props: {
    id: {
    type: Number,
    required: true,
    },
  },
  mounted (){
    fetch("http://localhost:3000/api/sujet/" + this.id, {
      method: 'GET'
    })
    .then (res => res.json())
    .then(data => this.Topic = data)
    .then(data => this.Subject = data.subject[0])
    
    .catch(() => console.log({message: "connexion impossible"}))
  },
}
</script>