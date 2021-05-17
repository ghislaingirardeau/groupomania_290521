<template>

  <section id="Home" class="container">
    
    <header class="header_home">
      <img src="@/assets/Logo/icon-left-font.svg" alt="logo_groupomania" id="logo_home" class="mt-n5 mb-n5 w-50"/>
      <h1 class="col-12 mt-lg-n5">Bienvenue sur notre forum {{username}}</h1>
      <a href="/" @click="disconnect" class="nav_link_display">Se déconnecter</a>
    </header>

    <nav class="row d-flex justify-content-around mt-3">
      <router-link :to="{name: 'topics'}" class="nav_link_display">Accueil</router-link>  
      <router-link :to="{name: 'Addtopic'}" class="nav_link_display">Créer un sujet</router-link> <!-- Masquer les sujets au click avec v-show -->
      <router-link :to="{name: 'account'}" class="nav_link_display">Mon compte</router-link> <!-- Masquer les sujets au click avec v-show --> 
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

<style>
/* .header_home{
  border: 2px solid green;
  height: 300px;
  overflow: hidden;
  position: relative;
}

#logo_home{
z-index: -1;
position: absolute;
left: 25%;
right: 25%;
object-fit: cover;
width: 100%;
border: 2px solid green;
} */
</style>
