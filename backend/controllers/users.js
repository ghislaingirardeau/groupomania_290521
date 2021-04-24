const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const salt = 10

/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);

exports.signup = (req, res, next) => { /* EMAIL UNIQUE ??? */

    bcrypt.hash(req.body.password, salt)
    .then(hash => {

        const sql = `INSERT INTO Users (pseudo, email, password) 
            VALUES ("${req.body.pseudo}", "${req.body.email}", "${hash}");`;
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({message: 'Ce pseudo existe deja'})
            }
            else if(results){
                res.status(201).json({message: 'user créé'})
            }
        });
    })
    .catch(() => res.status(400).json({message: 'Echec'}))
}

/* CLE TOKEN A MASQUER */
exports.login = (req, res, next) => { 
   
    const sql = `SELECT * FROM Users WHERE pseudo="${req.body.pseudo}"`;
    connection.query(sql, (error, results, fields) => {
        if (results.length == 0 || error) {
            res.status(400).json({message: "Ce pseudo n'existe pas"})
        }
        else if(results.length > 0){
                bcrypt.compare(req.body.password, results[0].password)
            .then(valid => {
                if (!valid){
                return res.status(401).json({message: "Ce mot de passe n'est pas valide"})
                }
                res.status(200).json({
                userId: results[0].id,
                    token: jwt.sign(
                    {userId: results[0].id}, `CLE TOKEN`,
                    { expiresIn: '24h'})  
                })
            })
            .catch(() => res.status(500).json({message: "erreur login"}))
        }           
    });
}

/* LOGIN
Le post front attendu { "pseudo": "Paul", "password": "qwerty"} 
*/

/* SIGNUP
Le post front attendu { "pseudo": "Paul", "email":"toto@mail.com" , "password": "qwerty"} 
*/
