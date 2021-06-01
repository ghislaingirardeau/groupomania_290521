<template>

    <div id="log" class="container">

        <img src="@/assets/Logo/icon-above.png" alt="logo_groupomania" class="img-fluid"/>
        <h1 class="col-12">Bienvenue sur le forum Groupomania</h1>

        <nav class="row d-flex justify-content-center mt-5">
            <router-link :to="{name: 'Login'}" class="col-5">Se connecter</router-link>
            <router-link :to="{name: 'Signup'}" class="col-5">S'inscrire</router-link>    
        </nav>
        <router-view></router-view> 

        <UploadTuto/>
        <Preview/>

    </div>

</template>

<script>
import Preview from '../components/preview.vue'
import UploadTuto from '../components/upload tuto.vue'

export default {
  
  components: {
    Preview,
    UploadTuto
  },
}
</script>

