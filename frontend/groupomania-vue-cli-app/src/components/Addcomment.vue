<template>
    <article>
      <h2>Ajouter un commentaire</h2>

      <!-- <form action="../Accueil">
        <label for="Comment">Nouveau commentaire</label>
        <input for="Comment" type="text" v-model="post.comment">
        <input type="submit" value="Envoyer !" @click="postComment">
      </form> -->
      <label for="Comment">Nouveau commentaire</label>
      <input for="Comment" type="text" v-model="post.comment">
      <a :href="'http://localhost:8080/sujet/' + id" @click="postComment">Envoyer</a>
    </article>
</template>

<script>
export default {
    name: "AddComment",
    data () {
        return {
          post: {
            user_id: null,
            comment: null
          }
        }
    },
    props: {
      user: Number,
      id: { /* recupere id du topic qui est dans l'url */
      type: Number,
      required: true,
    },
    },
    
    methods: {
      
        postComment() { 
          var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
          this.post.user_id = this.user /* envoie le userid dans le post */
          
          fetch("http://localhost:3000/api/sujet/" + this.id, {
            method: 'POST',
            headers: {
              "content-type": "application/json",
              "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify(this.post)
          })
          .then (res => res.json())
          .catch(() => console.log({message: "connexion impossible"}))
        } 
    },
}
</script>

