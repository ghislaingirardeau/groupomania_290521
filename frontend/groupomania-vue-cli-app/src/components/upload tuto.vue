<template>
    <div>
        <!-- ENVOIE AVEC FORM -->
        <!-- Incovenient la redirection n'est pour le moment pas possible apres submit -->
        <label for="Comment" class="col-12">UPLOAD VIA FORM</label>
        <form ref='uploadForm' id='uploadForm' action='http://localhost:3000/upload'
        method='post' encType="multipart/form-data"> <!-- ACTION: URI DE API -->
          <input type="file" name="image" /> <!-- METTRE LE NPM DU FICHIER COTE BACKEND -->
          <input type="text" name="nom" id="text"> <!-- ajout des input text dans form, envoie dans req.body -->
          <input type='submit' value='Upload!' />
        </form> 
        
        <!-- ENVOIE AVEC FETCH -->
        <!-- avantage: controle de la redirection et ajout de fonction possible -->
        <label for="Comment" class="col-12">UPLOAD VIA FONCTION</label>
        <textarea name="Comment" id="Comment" v-model="post.comment" placeholder="Taper votre commentaire ici..." class="col-11 col-lg-8" rows="1"></textarea>
        <input type="file" name="image"  id="myfile"/> <!-- 'name' qui doit etre identique cote backend -->
        <button class="btn btn-orange btn-lg mt-4" @click="postComment">Publier</button> <!-- applique le fecth au click -->
        <p class="message__serveur--blanc col-12">{{serverMessage}}</p>

    </div>
</template>

<script>
export default {
  data () {
      return {
        post: {
          user_id: null,
          comment: null
        },
        serverMessage: null,
      }
  },
    
  methods: {
    postComment() { /* envoie des données en dataform sans le formulaire en html */
    var image = document.getElementById('myfile').files[0]
    var formdata = new FormData();
    formdata.append('image', image); /* mettre le meme nom de fielname a recuperer cote backend */
    formdata.append('comment', this.post.comment); /* Si on souhaite ajouter des donnees dans le body */
    /* Ne pas mettre de content type si envoie de formdata */
      fetch("http://localhost:3000/upload", { 
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