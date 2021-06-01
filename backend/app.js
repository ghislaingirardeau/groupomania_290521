const express = require('express')
const fileUpload = require('express-fileupload');
const usersRoute = require('./routes/users')
const topicRoutes = require('./routes/topic')
const uploadRoutes = require('./routes/upload')

const app = express()


/* Configuration du header */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') /* * pour la soutenance, pour la presentation mettre le 8080 */
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  next()
})    

app.use(express.json())
app.use(fileUpload());

app.use('/api/compte', usersRoute)
app.use('/api/sujet', topicRoutes)
app.use('', uploadRoutes)



module.exports = app