<template>

    <main> 
      <h2>Suivez l'actualité des derniers sujets commentés</h2>

      <article v-for="item in Topics.lastTopicComment" :key="item.topicId"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
          <h3>{{item.topic}}</h3>
          <p>Sujet créé par {{item.username}}</p>
          <p>Dernier commentaire fait {{item.Date}}</p>
        </a>
      </article>

      <h2>Retrouver nos derniers sujets créés</h2>

      <article v-for="item in Topics.AllTopic" :key="item.topicId"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
          <h3>{{item.topic}}</h3>
          <p>Sujet créé par {{item.username}} {{item.Date}}</p>
        </a>
      </article>
    </main>

</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      Topics: {},
      user_id: null,
      show: true
    }
  },
  mounted (){
    var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login */
    this.user_id = sessionStorage.getItem('userId')
    
    fetch("http://localhost:3000/api/sujet", {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + token
      }
    })
    .then (res => res.json())
    .then(data => this.Topics = data)
    .catch(() => console.log({message: "connexion impossible"}))
  }
}

</script>