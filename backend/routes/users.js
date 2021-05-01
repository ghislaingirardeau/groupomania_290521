const express = require('express')
const userControle = require('../controllers/users')
const router = express.Router()

router.post('/signup', userControle.signup) /* REQUETE ATTENDU { "username": "XXX", "email":"XXX" , "password": "XXX"}  */
router.post('/login', userControle.login) /* REQUETE ATTENDU { "username":"XXX", "password": "XXXX"} */
router.delete('/remove', userControle.deleteAccount) /* REQUETE ATTENDU { "username":"XXX", "email":"XXX" "password": "XXXX"} */

module.exports = router