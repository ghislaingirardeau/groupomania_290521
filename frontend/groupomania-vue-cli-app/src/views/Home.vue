<template>
  <section id="sujet_view">

    <h1>BIENVENUE SUR LE FORUM Groupomania</h1>

    <article>
      <h2>Créer un sujet</h2>
      <label for="subject">Nouveau sujet</label>
      <input for="subject" type="text" v-model="comment">
    </article>

    <article class="last_subject_comment"> 
      <h2>Suivez l'actualité des derniers sujets commentés</h2>

      <div v-for="item in Topics.lastTopicComment" :key="item.topicId"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
        <h3>{{item.topic}}</h3>
        <p>Sujet créé par {{item.username}}</p>
        <p>Dernier commentaire fait le {{item.date_modification}}</p>
        </a>
      </div>
    </article>

    <article class="allsubject"> 
      <h2>Retrouver tous les sujets</h2>

      <div v-for="item in Topics.AllTopic" :key="item.topicId"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
        <h3>{{item.topic}}</h3>
        <p>Sujet créé par {{item.username}}</p>
        <p>Dernier commentaire fait le {{item.date_creation}}</p>
        </a>
      </div>

    </article>
  </section>
</template>

<script>
export default {
  name: 'sujet_view',
  data () {
    return {
      Topics: {},
      post: {
        user_id: null,
        comment: null
      }
    }
  },
 
  mounted (){
    fetch("http://localhost:3000/api/sujet", {
      method: 'GET'
    })
    .then (res => res.json())
    .then(data => this.Topics = data)
    .catch(() => console.log({message: "connexion impossible"})),

    fetch("http://localhost:3000/api/sujet", {
      method: 'POST',
      headers: {"content-type": "application/json"},
      body: JSON.stringify(this.post)
    })
    .then (res => res.json())
    .catch(() => console.log({message: "connexion impossible"}))
  }
}
</script>
