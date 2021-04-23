const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const salt = 10

/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, salt)
    .then(hash => {

        const sql = `INSERT INTO Users (pseudo, email, password) VALUES ("${req.body.pseudo}", "${req.body.email}", "${hash}");`;
        connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: 'Echec'})
        }
        console.log(results)
        return res.status(401).json({message: 'user créé'})
        
        });
        connection.end(); 
                    
    })
    .catch(() => res.status(400).json({message: 'Echec'}))
}




/* exports.login = (req, res, next) => {
    
    var buffer = Buffer.from(req.body.email, process.env.BUFF_ENC);
    
    User.findOne({email: buffer})
    .then(user => {
        if(!user){
            return res.status(401).json({message: "Cet email n'est pas valide"})
        }
        
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({message: "Ce mot de passe n'est pas valide"})
            }     
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                {userId: user._id}, `${process.env.TOKEN_USERS}`,
                { expiresIn: '24h'})  
            })
        })
        .catch(() => res.status(500).json({message: "erreur login"}))   
    })
    .catch(() => res.status(500).json({message: "login impossible"}))   
} */



