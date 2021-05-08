<template>
  <div v-for="item in Topics.AllTopic" :key="item.topicId">
    <article v-if="item.topicId == showid">
        <h1>{{item.topic}}</h1>
        <p>Sujet créé par {{item.username}}</p>
        
    </article>
        
  </div>
</template>

<script>

export default {
  data () {
    return {
      Topics: {
        AllTopic: [
        {
            topicId: 24,
            topic: "new forum groupomania",
            username: "jean",
            user_id: 17,
            date_creation: "2021-05-05T16:24:44.000Z"
        },
        {
            topicId: 11,
            topic: "autre groupomania",
            username: "paul",
            user_id: 17,
            date_creation: "2021-05-05T16:24:44.000Z"
        }
        ],
        lastTopicComment: [
        {
            topicId: 56,
            topic: "noel",
            username: "todos",
            user_id: 14,
            date_modification: "2021-05-05T17:14:19.000Z"
        },
        {
            topicId: 24,
            topic: "new forum groupomania",
            username: "jean",
            user_id: 17,
            date_modification: "2021-05-05T16:43:34.000Z"
        }
        ]
      },
    }
  },
  computed: {
    showid() {
      let idtopic = window.location.search
      let getid = new URLSearchParams(idtopic)
      let topic = getid.get("topicId")
      console.log(topic)
      return topic
    }
  } 
}
</script>