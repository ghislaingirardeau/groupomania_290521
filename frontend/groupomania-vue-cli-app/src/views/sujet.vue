<template>
  <section>
      <div>
        <h1>{{Topics.subject[0].topic}}</h1>
        <p>Sujet créé par {{Topics.subject[0].username}}</p>
      </div>
      
      <article v-for="item in Topics.comments" :key="item.commentId">
        <h2>{{item.user_comment}}</h2>
        <p>Envoyé par {{item.username}} le {{item.date_comment}}</p>

      </article>
  </section>
</template>

<script>

export default {
  data () {
    return {
      Topics: {
        comments: [
        {
            commentId: 53,
            user_comment: "pas tres cool",
            date_comment: "2021-05-01T15:35:25.000Z",
            username: "jean",
            user_id: 17
        },
        {
            commentId: 55,
            user_comment: "j'aime aussi ce sujet",
            date_comment: "2021-05-03T14:48:35.000Z",
            username: "jean",
            user_id: 17
        }
        ],
        subject: [
        {
            topic: "noel",
            user_id: 14,
            username: "todos"
        }
        ]
      },
    }
  },
  computed: {
    showid() { /* Peut utiliser en v-if="item.topicId == showid" */
      let idtopic = window.location.search
      let getid = new URLSearchParams(idtopic)
      let topic = getid.get("topicId")
      console.log(topic)
      return topic
    }
  }
}
</script>