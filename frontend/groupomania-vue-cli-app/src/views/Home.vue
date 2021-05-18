<template>

  <section id="Home" class="container">
    
    <header class="header_home">
      <img src="@/assets/Logo/icon-left.png" alt="logo_groupomania" class="img-fluid"/>
      <h1 class="col-12">{{username}}, bienvenue sur notre forum</h1>
      <a href="/" @click="disconnect" class="nav_link_display">Se déconnecter</a>
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

export default {
  name: 'Home',
  data () {
    return {
      username: sessionStorage.getItem('username'),
      }
  },
  methods: {
    disconnect(){ /* au click de la deconnection, on nettoie la session storage */
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('role')
    }
  }
  
}
</script>

