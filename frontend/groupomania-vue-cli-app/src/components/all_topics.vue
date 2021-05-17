<template>

  <main class="container mt-5">
    <div class="row d-flex justify-content-between">
    <div class="col-12 col-lg-6" id="last_topic">
      <h2 class="col-12 pt-3 pb-3">Suivez l'actualité des derniers sujets</h2>

      <article v-for="item in Topics.lastTopicComment" :key="item.topicId" id="last_topic--layout" class="col-12 topic--layout"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
          <h3 class="pt-5 pb-5 border-bottom border-secondary">{{item.topic}}</h3>
          <p class="font-italic text-left">Créé par {{item.username}} <br>Dernier commentaire fait <br>{{item.Date}}</p>
        </a>
      </article>
    </div>

    <div class="col-12 col-lg-5 mt-5 mt-lg-0" id="all_topic">
      <h2 class="col-12 pt-3 pb-3">Retrouver nos derniers sujets créés</h2>

      <article v-for="item in Topics.AllTopic" :key="item.topicId" class="col-12 topic--layout"> <!-- Envoyer l'id en parametre url au click -->
        <a :href="'sujet/' + item.topicId">
          <h3 class="pt-5 pb-5 border-bottom border-secondary">{{item.topic}}</h3>
          <p class="font-italic text-left">Sujet créé par {{item.username}} <br> {{item.Date}}</p>
        </a>
      </article>
    </div>
    </div>
  </main>

</template>

<style>
#last_topic {
  background-color: rgb(240, 90, 30);
  border-radius: 10px 10px;
  box-shadow: #2f353a 5px 5px 5px;
}
#all_topic {
  background-color: #0d4883;
  border-radius: 10px 10px;
  box-shadow: #2f353a 5px 5px 5px;
}
#last_topic h2{
  color: white;
  font-weight: bold;
}
#all_topic h2{
  color: white;
  font-weight: bold;
}
.topic--layout {
  background-color: white;
  border: 2px solid #2f353a;
  border-radius: 10px 10px;
  margin-bottom: 20px;
}
.topic--layout:hover{
  box-shadow: #2f353a 5px 5px 5px;
}
.topic--layout h3{
  font-style: initial;
  color: #2f353a;
}
.topic--layout p{
  font-weight: 600;
  color: #2f353a;
  font-size: 1rem;
}


</style>

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