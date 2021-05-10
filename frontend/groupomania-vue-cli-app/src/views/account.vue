<template>
    <div id="account">
        Ceci est la page du login
        <login/>
    </div>
</template>

<script>
import login from '../components/login.vue'

export default {
    name: "account",
    data () {
    },
    components: {
        login
    }  
}
</script>