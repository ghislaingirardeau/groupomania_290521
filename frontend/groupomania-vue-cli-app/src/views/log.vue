<template>

    <div id="log">
        <img src="@/assets/Logo/icon-above-font.svg" alt="logo_groupomania" id="logo_log"/>
        <h1>Bienvenue sur le forum Groupomania</h1>
        <nav>
            <router-link :to="{name: 'Login'}" class="nav_link_display">Login</router-link>
            <router-link :to="{name: 'Signup'}" class="nav_link_display">Signup</router-link>    
        </nav>
        <router-view></router-view> 
    </div>

</template>

<style>

#log {
    text-align: left;
}

h1 {
    text-align: right;
    border: 2px solid black;
}

#logo_log {
    width: 40%;
    border: 2px solid black;
}

nav {
    border: 2px solid black;
    margin: 0px 0 50px 0;
    
}

</style>