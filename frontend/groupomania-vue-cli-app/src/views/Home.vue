<template>

  <section id="Home" class="container">
    
    <header class="header_home">
      <img src="@/assets/Logo/icon-left.png" alt="logo_groupomania" class="img-fluid"/>
      <h1 class="col-12">Bienvenue, {{username}}</h1>
      <deconnexion/>
    </header>

    <nav class="row d-flex justify-content-around mt-3">
      <router-link :to="{name: 'topics'}" class="col-12 col-md-4 nav_link_display">Liste des sujets</router-link>  
      <router-link :to="{name: 'Addtopic'}" class="col-12 col-md-4 nav_link_display">Créer un sujet</router-link> <!-- Masquer les sujets au click avec v-show -->
      <router-link :to="{name: 'account'}" class="col-12 col-md-4 nav_link_display">Mon compte</router-link> <!-- Masquer les sujets au click avec v-show --> 
    </nav>
    <router-view></router-view> 
    
  </section>

</template>

<script>
import deconnexion from '../components/deconnexion.vue'

export default {
  name: 'Home',
  data () {
    return {
      username: sessionStorage.getItem('username'),
      }
  },
  components: {
    deconnexion
  },
}
</script>

