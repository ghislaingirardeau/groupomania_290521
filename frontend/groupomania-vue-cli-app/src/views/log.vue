<template>

    <nav id="account">
        
    <h1>Bienvenue sur le forum Groupomania</h1>
    
    <router-link :to="{name: 'Login'}">login</router-link> |
    <router-link :to="{name: 'Signup'}">signup</router-link>    
    <router-view></router-view> 
    </nav>

</template>

<script>
</script>