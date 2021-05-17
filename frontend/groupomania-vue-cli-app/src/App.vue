<template>
  <div id="body">
    
  <router-view></router-view> 
  </div>

</template>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0d4883;
  font-size: 1.2rem;
}

#body {
  padding: 30px;
}

#body nav a {
  font-weight: bold;
  color: #0d4883;
  font-size: 1.4rem;
}

#body a {
  font-style: italic;
  font-weight: bold;
  color: #0d4883;
  font-size: 1.4rem;
}

#body a.router-link-exact-active {
  color: rgb(240, 90, 30);
}

.message__serveur{
  padding-top: 10px;
  font-weight: bold;
  color: rgb(214, 37, 37);
}

input, textarea{
  border: 2px solid #2f353a;
  border-radius: 5px 5px;
}

input:focus, textarea:focus{
  box-shadow: #0d4883 1px 1px 7px 1px;
  border-radius: 5px 5px;
  outline: unset;
}


</style>
