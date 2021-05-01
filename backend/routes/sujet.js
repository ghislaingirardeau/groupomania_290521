const express = require('express')
const sujet = require('../controllers/sujet')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', authentification, sujet.allTopics)
router.post('/', authentification, sujet.createTopic)  /* REQUETE ATTENDU { user_id:XXX ,topic: XXXX} */

router.get('/:topic_id', authentification, sujet.allComments)   /* AU CLIC, ENVOIE sujet_id EN URL PARAMS */
router.post('/:topic_id', authentification, sujet.addComment)   /* REQUETE ATTENDU { user_id:XXX ,comment: XXXX} */

router.delete('/:topic_id/:comment_id', authentification, sujet.removeComment) /*REQUETE ATTENDU { user_id:XXX } */
router.put('/:topic_id/:comment_id', authentification, sujet.modifyComment) /*REQUETE ATTENDU { user_id:XXX ,comment: XXXX} */

module.exports = router