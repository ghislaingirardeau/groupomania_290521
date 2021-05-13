<template>
  <div id="body">
    
  <router-view></router-view> 
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.2rem;
}

#body {
  padding: 30px;
}

#body a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.4rem;
}

#body a.router-link-exact-active {
  color: #42b983;
}

.nav_link_display {
  margin: 0 100px 0 100px;
}


</style>
