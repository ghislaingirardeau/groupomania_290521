<template>
  <section class="sujet">
    <h1>BIENVENUE SUR LE FORUM Groupomania</h1>
    <article> 
      <h2>{{title}}</h2>
      <p>{{sujet[2].topic}}</p> <!-- faire une boucle d'un bloc html pour afficher chaque index de sujet -->
      

    </article>
  </section>
</template>

<script>
export default {
  data () {
    return {
      title: "Suivez l'actualité des derniers sujets commentés",
      sujet: null
    }
  },
  mounted (){
    fetch("http://localhost:3000/api/sujet")
    .then (res => res.json())
    .then(data => this.sujet = data.AllTopic)
    .catch(err => console.log(err.message))

  }
}
</script>