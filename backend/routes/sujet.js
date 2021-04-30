const express = require('express')
const sujet = require('../controllers/sujet')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', authentification, sujet.listeSujet)
router.post('/', authentification, sujet.creerSujet)  /* REQUETE ATTENDU { user_id:XXX ,theme: XXXX} */

router.get('/:sujet_id', authentification, sujet.listeCommentaires)   /* AU CLIC, ENVOIE sujet_id EN URL PARAMS */
router.post('/:sujet_id', authentification, sujet.ajoutCommentaire)   /* REQUETE ATTENDU { pseudo_id:XXX ,comment: XXXX} */

router.delete('/:sujet_id/:commentaire_id', authentification, sujet.suppressionCommentaire) /*Si userId = comment user ID envoie commentId en URL parametre */
router.put('/:sujet_id/:commentaire_id', authentification, sujet.modifCommentaire)

module.exports = router