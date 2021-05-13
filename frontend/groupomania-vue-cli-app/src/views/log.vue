<template>

    <div id="log" class="container">
        <div class="row, text-center">
        <img src="@/assets/Logo/icon-above-font.svg" alt="logo_groupomania" id="logo_log" class="mt-n5"/>
        <h1 class="col-12, mt-n5">Bienvenue sur le forum Groupomania</h1>
        </div>
        <nav class="row, text-center, mt-4">
            <router-link :to="{name: 'Login'}" class="pr-5">Login</router-link>
            <router-link :to="{name: 'Signup'}" class="pl-5">Signup</router-link>    
        </nav>
        <router-view></router-view> 
    </div>

</template>

<style>
#logo_log {
    width: 40%;
}

nav {
    border-bottom: 2px solid rgb(212, 89, 89);
    border-top: 2px solid rgb(212, 89, 89);
}

</style>