const express = require('express')
const sujet = require('../controllers/sujet')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', authentification, sujet.allTopics)
router.post('/', authentification, sujet.createTopic)  /* REQUETE ATTENDU { user_id:XXX ,theme: XXXX} */

router.get('/:sujet_id', authentification, sujet.allComments)   /* AU CLIC, ENVOIE sujet_id EN URL PARAMS */
router.post('/:sujet_id', authentification, sujet.addComment)   /* REQUETE ATTENDU { pseudo_id:XXX ,comment: XXXX} */

router.delete('/:sujet_id/:comment_id', authentification, sujet.removeComment) /*Si userId = comment user ID envoie commentId en URL parametre */
router.put('/:sujet_id/:comment_id', authentification, sujet.modifyComment)

module.exports = router