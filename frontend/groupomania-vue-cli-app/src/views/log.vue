<template>

    <div id="log" class="container mt-md-n5">
        <div class="text-center">
            <img src="@/assets/Logo/icon-above-font.svg" alt="logo_groupomania" id="logo_log" class="mt-n5 mb-n5 w-50"/>
            <h1 class="col-12 mt-lg-n5">Bienvenue sur le forum Groupomania</h1>
        </div>
        <nav class="row d-flex justify-content-center mt-5">
            <router-link :to="{name: 'Login'}" class="col-5">Se connecter</router-link>
            <router-link :to="{name: 'Signup'}" class="col-5">S'inscrire</router-link>    
        </nav>
        <router-view></router-view> 
    </div>

</template>

