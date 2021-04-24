const express = require('express')
const sujet = require('../controllers/sujet')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', /* authentification */ sujet.listeSujet)
router.post('/', sujet.creerSujet)

router.get('/:sujet_id', sujet.listeCommentaires)
router.post('/:sujet_id', sujet.ajoutCommentaire)

/* 

router.delete('/:sujet_id', sujet.suppressionCommentaire) */


module.exports = router