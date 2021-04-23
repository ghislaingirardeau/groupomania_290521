const express = require('express')

const usersRoute = require('./routes/users')
/* const saucesRoutes = require('./routes/sauces') */



const app = express()

/* Configuration du header */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  next()
})    

app.use(express.json())

app.use('/api/auth', usersRoute)
/* app.use('/api/sauces', saucesRoutes) */

module.exports = app