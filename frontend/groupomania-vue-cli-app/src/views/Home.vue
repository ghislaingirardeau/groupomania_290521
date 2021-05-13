<template>

  <section id="Home">

    <h1>BIENVENUE </h1>

    <nav>
    <router-link :to="{name: 'topics'}" >Accueil</router-link> | 
    <router-link :to="{name: 'Addtopic'}" >Créer un sujet</router-link> | <!-- Masquer les sujets au click avec v-show -->
    <router-link :to="{name: 'account'}" >Mon compte</router-link> | <!-- Masquer les sujets au click avec v-show -->
    <a href="/" @click="disconnect">Deconnexion</a> 
        
    <router-view></router-view> 
    </nav>

  </section>

</template>

<script>

export default {
  name: 'Home',
  data () {
    
  },

  disconnect(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
  }
  
}
</script>
