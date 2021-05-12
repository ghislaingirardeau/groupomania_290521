<template>

  <section id="Home">

    <h1>BIENVENUE SUR LE FORUM Groupomania</h1>

    <aside>
      <Addtopic :user='user_id'/> <!-- composant pour l'ajout de sujet -->
    </aside>

    <aside>
      <Deleteaccount/> <!-- composant pour l'ajout de sujet -->
    </aside>

    <main class="last_subject_comment"> 
      <h2>Suivez l'actualité des derniers sujets commentés</h2>

      <article v-for="item in Topics.lastTopicComment" :key="item.topicId"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
          <h3>{{item.topic}}</h3>
          <p>Sujet créé par {{item.username}}</p>
          <p>Dernier commentaire fait le {{item.date_modification}}</p>
        </a>
      </article>
    </main>

    <main class="allsubject">
      <h2>Retrouver nos derniers sujets créés</h2>

      <article v-for="item in Topics.AllTopic" :key="item.topicId"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
          <h3>{{item.topic}}</h3>
          <p>Sujet créé par {{item.username}} le {{item.date_creation}}</p>
        </a>
      </article>
    </main>

  </section>

</template>

<script>
import Addtopic from '../components/Addtopic.vue'
import Deleteaccount from '../components/Deleteaccount.vue'

export default {
  name: 'Home',
  data () {
    return {
      Topics: {},
      user_id: null
    }
  },
  components: {
    Addtopic,
    Deleteaccount
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
