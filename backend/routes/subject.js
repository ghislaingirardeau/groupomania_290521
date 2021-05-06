const express = require('express')
const subject = require('../controllers/subject')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', /* authentification, */ subject.allTopics)
router.post('/', authentification, subject.createTopic)  /* expect { "user_id":"XXX" ,"topic": "XXXX"} */

router.get('/:topic_id', authentification, subject.allComments)   /* send tpoicId IN URL PARAMS */
router.post('/:topic_id', authentification, subject.addComment)   /* expect {"user_id":"XXX" ,"comment": "XXXX"} */

router.delete('/:topic_id/:comment_id', authentification, subject.removeComment) /*expect { user_id:XXX } */
router.put('/:topic_id/:comment_id', authentification, subject.modifyComment) /*expect { user_id:XXX ,"comment": "XXXX"} */

module.exports = router