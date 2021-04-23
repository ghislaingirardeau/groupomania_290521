const express = require('express')

const usersRoute = require('./routes/users')
/* const saucesRoutes = require('./routes/sauces') */

/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sql = `SELECT COUNT(*)+1 FROM users;`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});
connection.end();

const app = express()

/* Configuration du header */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  next()
})    

app.use(express.json())

/* app.use('/api/auth', usersRoute) */
/* app.use('/api/sauces', saucesRoutes) */

module.exports = app