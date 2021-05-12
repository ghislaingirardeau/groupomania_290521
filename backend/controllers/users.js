const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);

const salt = 10

exports.signup = (req, res, next) => {

    var buffer = Buffer.from(req.body.email, `${process.env.ENCODAGE}`);

    bcrypt.hash(req.body.password, salt)
    .then(hash => {

        const sql = `SET @username="${req.body.username}", @email="${buffer}", @password="${hash}";`
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({message: 'Ce pseudo existe deja'})
            }
            else if(results){
                const sql = `CALL signup_user(@username, @email, @password);`;
                connection.query(sql, (error, result, fields) => {
                    if (error) {
                        res.status(400).json({message: 'Ce pseudo ou cette email existe deja'})
                    }
                    else if(result){ /* Au succes du signup, renvoie ID au frontend pour une connection immediate a l'accueil */
                        let userSelect = result[0] /* extrait l'array correspondant a ma selection dans le array de resultat car renvoie array(insert) et array(select) */                                               
                        res.status(200).json({
                        userId: userSelect[0].id,
                            token: jwt.sign(
                            {userId: userSelect[0].id}, `${process.env.CLE}`,
                            { expiresIn: '24h'})  
                        })
                    }
                });
            }
        });
    })
    .catch(() => res.status(400).json({message: 'Echec'}))
}

exports.login = (req, res, next) => { 

    const sql = `SET @username="${req.body.username}"`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(500).json({message: 'erreur database'})
        }
        else if(results){

            const sql = `SELECT * FROM Users WHERE username=@username`;
            connection.query(sql, (error, results, fields) => {
                if (results.length == 0 || error) {
                    res.status(400).json({message: "Ce pseudo n'existe pas"})
                }
                else if(results.length == 1){
                    bcrypt.compare(req.body.password, results[0].password)
                    .then(valid => {
                        if (!valid){
                        return res.status(400).json({message: "Ce mot de passe n'est pas valide"})
                        }
                        res.status(200).json({
                        userId: results[0].id,
                            token: jwt.sign(
                            {userId: results[0].id}, `${process.env.CLE}`,
                            { expiresIn: '24h'})  
                        })
                    })
                    .catch(() => res.status(500).json({message: "erreur login"}))
                }           
            });
        }
    });
}

exports.deleteAccount= (req, res, next) => { /* A SUPPR DU COMPTE ON DELETE CASCADE supprime les sujets et commentaires lies au compte */
   
    var buffer = Buffer.from(req.body.email, `${process.env.ENCODAGE}`);
    
    const sql = `SELECT password FROM Users WHERE email="${buffer}" AND username="${req.body.username}"`;
    connection.query(sql, (error, results, fields) => {
        
        if (results.length == 0 || error) {
            res.status(400).json({message: "Ce pseudo ou cet email ne sont pas valides"})
        }
        else if(results.length == 1){ /* Demande une auth du mot de passe pour valider la suppression */
            
            bcrypt.compare(req.body.password, results[0].password)
            .then(valid => {
                if (!valid){
                return res.status(400).json({message: "Ce mot de passe n'est pas valide"})
                }
                const sql = `DELETE FROM users WHERE email="${buffer}" AND username="${req.body.username}"`;
                connection.query(sql, () => {
                    return res.status(200).json({message: "Votre compte est supprimé"})   
                });
            })
            .catch(() => res.status(500).json({message: "erreur login"}))
        }      
    });
}


