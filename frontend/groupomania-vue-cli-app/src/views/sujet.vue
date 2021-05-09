<template>
  <section>
      <!-- <div>
        <h1>{{Topic.subject[0].topic}}</h1>
        <p>Sujet créé par {{Topic.subject[0].username}}</p>
      </div>
      <article v-for="item in Topic.comments" :key="item.commentId">
        <h2>{{item.user_comment}}</h2>
        <p>Envoyé par {{item.username}} le {{item.date_comment}}</p>
      </article> -->
      asdsf
  </section>
</template>

<script>

export default {
  data () {
    return {
      Topic: {},
    }
  },
  beforemounted (){
    let idtopic = window.location.search
    let getid = new URLSearchParams(idtopic)
    let topic = getid.get("topicId")
    console.log(topic)
    fetch("http://localhost:3000/api/sujet/" + topic, {
      method: 'GET'
    })
    .then (res => res.json())
    .then(data => this.Topic = data)
    
    .catch(() => console.log({message: "connexion impossible"}))
  },
}
</script>