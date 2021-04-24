const express = require('express')
const sujet = require('../controllers/sujet')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', /* authentification */ sujet.listeSujet)
router.post('/', sujet.creerSujet)  /* REQUETE ATTENDU { pseudo_id:XXX ,sujet: XXXX} */

router.get('/:sujet_id', sujet.listeCommentaires)   /* AU CLIC, ENVOIE sujet_id EN URL PARAMS */
router.post('/:sujet_id', sujet.ajoutCommentaire)   /* REQUETE ATTENDU { pseudo_id:XXX ,comment: XXXX} */

/* 

router.delete('/:sujet_id', sujet.suppressionCommentaire) */


module.exports = router