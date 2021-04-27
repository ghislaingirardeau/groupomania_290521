const express = require('express')
const userControle = require('../controllers/users')
const router = express.Router()

router.post('/signup', userControle.signup) /* REQUETE ATTENDU { "pseudo": "XXX", "email":"XXX" , "password": "XXX"}  */
router.post('/login', userControle.login) /* REQUETE ATTENDU { "pseudo":"XXX", "password": "XXXX"} */
router.delete('/delete', userControle.deleteAccount)

module.exports = router