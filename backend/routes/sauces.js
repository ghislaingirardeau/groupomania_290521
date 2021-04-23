const express = require('express')
const sauces = require('../controllers/sauces')
const authentification = require('../Middleware/auth')

const router = express.Router()

router.get('/', authentification, sauces.toutesLesSauces)
router.post('/', authentification, sauces.createSauce)

router.get('/:id',  authentification, sauces.findSauce)
router.put('/:id', authentification, sauces.updateSauce)
router.delete('/:id', authentification, sauces.deleteSauce)

router.post('/:id/like', authentification, sauces.modifyLikes)

module.exports = router