<template>
  <section class="sujet_view">

    <h1>BIENVENUE SUR LE FORUM Groupomania</h1>

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
  data () {
    return {
      title: "Suivez l'actualité des derniers sujets commentés",
      Topics: {
        AllTopic: [
        {
            topicId: 24,
            topic: "new forum groupomania",
            username: "jean",
            user_id: 17,
            date_creation: "2021-05-05T16:24:44.000Z"
        },
        {
            topicId: 11,
            topic: "autre groupomania",
            username: "jean",
            user_id: 17,
            date_creation: "2021-05-05T16:24:44.000Z"
        }
        ],
        lastTopicComment: [
        {
            topicId: 56,
            topic: "noel",
            username: "todos",
            user_id: 14,
            date_modification: "2021-05-05T17:14:19.000Z"
        },
        {
            topicId: 24,
            topic: "new forum groupomania",
            username: "jean",
            user_id: 17,
            date_modification: "2021-05-05T16:43:34.000Z"
        }
        ]
      },
    }
  },
 
  /* mounted (){
    fetch("http://localhost:3000/api/sujet")
    .then (res => res.json())
    .then(data => this.Topics = data)
    .catch(() => console.log({message: "connexion impossible"}))

  } */
}
</script>