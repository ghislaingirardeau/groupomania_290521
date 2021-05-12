const express = require('express')
const userControle = require('../controllers/users')
const authentification = require('../Middleware/auth')
const router = express.Router()

router.post('/signup', userControle.signup) /* REQUETE ATTENDU { "username": "XXX", "email":"XXX" , "password": "XXX"}  */
router.post('/login', userControle.login) /* REQUETE ATTENDU   { "username": "XXX", "password": "XXX"}  */
router.delete('/remove', authentification, userControle.deleteAccount) /* REQUETE ATTENDU { "username":"XXX", "email":"XXX" "password": "XXXX"} */

module.exports = router