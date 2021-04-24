const express = require('express')
const sujet = require('../controllers/sujet')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', /* authentification */ sujet.listeSujet)
router.post('/', sujet.creerSujet)

/* router.post('/', sujet)

router.get('/:id',  sujet)
router.put('/:id', sujet)
router.delete('/:id', sujet) */


module.exports = router