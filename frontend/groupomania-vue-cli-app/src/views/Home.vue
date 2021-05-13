<template>

  <section id="Home">

    <h1>BIENVENUE {{username}}</h1>

    <nav>
    <router-link :to="{name: 'topics'}" class="nav_link_display">Accueil</router-link> | 
    <router-link :to="{name: 'Addtopic'}" class="nav_link_display">Créer un sujet</router-link> | <!-- Masquer les sujets au click avec v-show -->
    <router-link :to="{name: 'account'}" class="nav_link_display">Mon compte</router-link> | <!-- Masquer les sujets au click avec v-show -->
    <a href="/" @click="disconnect" class="nav_link_display">Deconnexion</a> 
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
  disconnect(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
  }
  
}
</script>
