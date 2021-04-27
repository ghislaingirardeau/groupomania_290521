const express = require('express')
const userControle = require('../controllers/users')
const router = express.Router()

router.post('/signup', userControle.signup) /* REQUETE ATTENDU { pseudo:XXX, password: XXXX} */
router.post('/login', userControle.login)

module.exports = router