<template>

    <div id="log" class="container">

        <img src="@/assets/Logo/icon-above.png" alt="logo_groupomania" class="img-fluid"/>
        <h1 class="col-12">Bienvenue sur le forum Groupomania</h1>

        <nav class="row d-flex justify-content-center mt-5">
            <router-link :to="{name: 'Login'}" class="col-5">Se connecter</router-link>
            <router-link :to="{name: 'Signup'}" class="col-5">S'inscrire</router-link>    
        </nav>
        <router-view></router-view> 

        <!-- ENVOIE AVEC FORM -->

        <form ref='uploadForm' id='uploadForm' action='http://localhost:3000/upload' 
        method='post' encType="multipart/form-data"> <!-- ACTION: URI DE API -->
          <input type="files" name="images" /> <!-- METTRE LE NPM DU FICHIER COTE BACKEND -->
          <input type="text" name="nom" id="text"> <!-- ajout des input text dans form, envoie dans req.body -->
          <textarea name="reponse" id="test" cols="10" rows="1"></textarea>
          <input type='submit' value='Upload!' />
        </form> 
        
        <!-- ENVOIE AVEC FETCH -->

        <label for="Comment" class="col-12">Publier votre commentaire ci-dessous:</label>
        <textarea name="Comment" id="Comment" v-model="post.comment" placeholder="Taper votre commentaire ici..." class="col-11 col-lg-8" rows="1"></textarea>
        <input type="file" name="image"  id="myfile"/>
        <button class="btn btn-orange btn-lg mt-4" @click="postComment">Publier</button>
        <p class="message__serveur--blanc col-12">{{serverMessage}}</p>

    </div>

</template>

<script>
export default {
  name: "AddComment",
  data () {
      return {
        post: {
          user_id: null,
          comment: null
        },
        serverMessage: null
      }
  },
  methods: {
      
    postComment() { 
    var image = document.getElementById('myfile').files[0]
    var formdata = new FormData();
    formdata.append('image', image);
    formdata.append('comment', this.post.comment); /* Si on souhaite ajouter des donnees dans le body */

      fetch("http://localhost:3000/upload", { /* Ne pas mettre de content type si envoie de formdata */
        method: 'POST',
        body: formdata
      })
      .then (res => {
        if(res.ok) {
          res.json()
          .then (data => {
            console.log(data)
            window.open('http://localhost:8080/', '_self')
          })
        }
        
      })
      .catch(() => console.log({message: "connexion impossible"}))
    } 
  },
}
</script>

