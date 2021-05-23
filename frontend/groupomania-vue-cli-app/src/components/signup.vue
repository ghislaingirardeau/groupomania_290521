<template>

  <div id="Signup" class="mt-5">

    <h2 class="col-12 mb-2">Remplissez le formulaire pour vous insrcire :</h2>


    <form>
      <label for="pseudo" class="col-12 mt-4">Mon pseudo</label>
      <input for="pseudo" type="text" id="pseudo" class="col-12 col-md-6" maxlength="40" required v-model="post.username" > <!-- copie les données dans le data post  -->
        
      <label for="email" class="col-12 mt-4">Mon adresse email</label>
      <input for="email" type="email" id="email" placeholder="exemple@mail.com" class="col-12 col-md-6" required v-model="post.email"> <!-- copie les données dans le data post  -->
        
      <label for="password" class="col-12 mt-4">Mot de passe (minimum 6 caractères dont 1 lettre)</label>
      <input for="password" type="password" id="password" pattern="/^.*(?=.{6,})(?=.*[a-zA-Z]).*$/" 
      title="mot de passe incorrect" class="col-12 col-md-6" required v-model="post.password"> <!-- copie les données dans le data post  -->
      
      <div class="col-12">
        <input type="submit" value="Envoyer" class="btn btn-orange btn-lg mt-4" @click="postSignup">
        <p class="message__serveur col-12">{{errorMessage}}</p>
      </div> 
    </form>

  </div>

</template>

<script>
export default {
  name: "Signup",
  data () {
    return {
      post: {
        username: '',
        email: '',
        password: '',
      },
      errorMessage: null
    }
  },
  methods: {
    postSignup() {

      const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      const regexPassword = /^.*(?=.{6,})(?=.*[a-zA-Z]).*$/ /* Minimum 6 caracteres dont 1 lettre */

      if (this.post.username != '' && regexEmail.test(this.post.email) === true && regexPassword.test(this.post.password) === true) { /* verifie la saiise des entrées */
        fetch("http://localhost:3000/api/compte/signup", {
          method: 'POST',
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.post)
        })
        .then (res => {
         
          if(res.ok) { /* si reponse est ok, je recupere le data */
          
            res.json()
            .then (data => {
              /* envoie le token et le id dans la session storage pour recup sur la page home */  
              sessionStorage.setItem('token', data.token)
              sessionStorage.setItem('userId', data.userId)
              sessionStorage.setItem('username', data.username)
              sessionStorage.setItem('role', data.role)
              window.open('/Accueil', '_self')
            })
          } else { /* sinon j'envoie une erreur */
            res.json()
            .then(data => {
              this.errorMessage = data.message /* renvoie error du backend sur le frontend, "pseudo ou email existe deja" */
            })
          }
        })
        .catch(() => console.log({message: "erreur de connexion"}))
      } else {
        this.errorMessage = "Tous les champs doivent etre correctement saisie"
      }
    },
  },
}
</script>