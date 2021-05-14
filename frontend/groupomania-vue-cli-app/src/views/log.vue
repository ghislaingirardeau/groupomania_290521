<template>

    <div id="log" class="container">
        <div class="row, text-center">
        <img src="@/assets/Logo/icon-above-font.svg" alt="logo_groupomania" id="logo_log" class="mt-n5"/>
        <h1 class="col-12, mt-n4">Bienvenue sur le forum Groupomania</h1>
        </div>
        <nav class="row, text-center, mt-5">
            <router-link :to="{name: 'Login'}" class="p-5">Se connecter</router-link>
            <router-link :to="{name: 'Signup'}" class="p-5">S'inscrire</router-link>    
        </nav>
        <router-view></router-view> 
    </div>

</template>

<style>
#logo_log {
    width: 50%;
}

nav {
    border-bottom: 3px solid rgb(212, 89, 89);
    border-top: 3px solid rgb(212, 89, 89);
    padding: 10px;
}

</style>