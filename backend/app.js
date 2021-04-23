const express = require('express')
const mysql = require('mysql');

const usersRoute = require('./routes/users')
/* const saucesRoutes = require('./routes/sauces') */

/* CONNECTION MYSQL */
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'olivieratone',
    database: 'elevage'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });


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