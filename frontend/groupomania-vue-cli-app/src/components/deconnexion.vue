<template>

    <a href="/" @click="disconnect" class="nav_link_display">Se déconnecter</a>

</template>

<script>

export default {
    methods: {
    disconnect(){ /* au click de la deconnection, on nettoie la session storage */
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('role')
    },
    }
}
</script>
