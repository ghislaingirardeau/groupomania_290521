<template>

    <div id="log" class="container">

        <img src="@/assets/Logo/icon-above.png" alt="logo_groupomania" class="img-fluid"/>
        <h1 class="col-12">Bienvenue sur le forum Groupomania</h1>

        <nav class="row d-flex justify-content-center mt-5">
            <router-link :to="{name: 'Login'}" class="col-5">Se connecter</router-link>
            <router-link :to="{name: 'Signup'}" class="col-5">S'inscrire</router-link>    
        </nav>
        <router-view></router-view> 

        <form ref='uploadForm' 
      id='uploadForm' 
      action='http://localhost:3000/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form> 
    </div>

</template>

