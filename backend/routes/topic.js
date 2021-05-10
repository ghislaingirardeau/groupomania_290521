const express = require('express')
const topic = require('../controllers/topic')
const comment = require('../controllers/comment')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', authentification, topic.allTopics)
router.post('/', authentification, topic.createTopic)  /* expect { "user_id":"XXX" ,"topic": "XXXX"} */

router.get('/:topic_id', authentification, comment.allComments)   /* send topicId IN URL PARAMS */
router.post('/:topic_id', authentification, comment.addComment)   /* expect {"user_id":"XXX" ,"comment": "XXXX"} */

router.delete('/:topic_id/:comment_id', authentification, comment.removeComment) /*expect { user_id:XXX } */
router.put('/:topic_id/:comment_id', authentification, comment.modifyComment) /*expect { user_id:XXX ,"comment": "XXXX"} */

module.exports = router