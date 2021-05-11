<template>
    <article id="Updatecomment">
      <h2>modifer mon commentaire</h2>

      <form action="../../Accueil">
        <label for="subject">Nouveau commentaire</label>
        <input for="subject" type="text" v-model="update.comment">
        <input type="submit" value="Modifier" @click="modifyComment">
      </form>

    </article>
</template>

<script>
export default {
    name: "Updatecomment",
    data () {
        return {
          update: {
            user_id: null,
            comment: null
          }
        }
    },
    props: {
      user: String,
      id: {
      type: Number,
      required: true,
      },
      commentId: {
      type: Number,
      required: true,
      },
    },
    methods: {
        
        modifyComment() { 
          var token = sessionStorage.getItem('token') /* recupere le token envoyé lors du login  */
          this.update.user_id = sessionStorage.getItem('userId')
          console.log(this.update)
          console.log(this.id)
           /* envoie le userid dans le put */

          fetch("http://localhost:3000/api/sujet/" + this.id + "/" + this.commentId, {
            method: 'PUT',
            headers: {
              "content-type": "application/json",
              "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify(this.update)
          })
          .then (res => res.json())
          .catch(() => console.log({message: "connexion impossible"}))
        } 
    },
}
</script>

