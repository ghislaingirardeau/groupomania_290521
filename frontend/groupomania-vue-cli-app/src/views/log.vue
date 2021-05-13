<template>

    <nav id="account">
    <img src="@/assets/Logo/icon-above-font.svg" alt="logo_groupomania" id="logo_log"/>
    <h1>Bienvenue sur le forum Groupomania</h1>
    
    <router-link :to="{name: 'Login'}" class="nav_display">Login</router-link>
    <router-link :to="{name: 'Signup'}" class="nav_display">Signup</router-link>    
    <router-view></router-view> 
    </nav>

</template>

<style>

#logo_log {
    width: 40%
}

</style>