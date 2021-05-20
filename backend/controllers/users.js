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
                res.status(400).json({message: 'erreur de variable'})
            }
            else if(results){
                const sql = `CALL signup_user(@username, @email, @password);`;
                connection.query(sql, (error, result, fields) => {
                    let userSelect = result[0] /* extrait l'array correspondant a la selection dans le array de resultat car renvoie array(insert) et array(select) */                                               
                    
                    if (error || userSelect[0].Status === "Error") {
                        res.status(400).json({message: userSelect[0].Response})
                    }
                    else if(result){ /* Au succes du signup, renvoie ID au frontend pour une connection immediate a l'accueil */
                        
                        res.status(200).json({
                            username: userSelect[0].username,
                            userId: userSelect[0].id,
                            token: jwt.sign({
                                userId: userSelect[0].id}, `${process.env.CLE}`,
                                { expiresIn: '24h'}),
                            role: userSelect[0].Roles
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

            const sql = `SELECT id, password, username, roles FROM Users WHERE username=@username`;
            connection.query(sql, (error, results, fields) => {

                if (results.length == 0 || error) { /* Si utilisateur n'existe pas, renvoie un tableau vide */
                    res.status(400).json({message: "Ce pseudo n'existe pas"})
                }
                else if(results.length == 1){ /* Si utilisateur existe, renvoie un tableau avec une seule donnée */
                    
                    bcrypt.compare(req.body.password, results[0].password)
                    .then(valid => {
                        if (!valid){
                        return res.status(400).json({message: "Ce mot de passe n'est pas valide"})
                        }
                        res.status(200).json({
                        username: results[0].username,    
                        userId: results[0].id,
                            token: jwt.sign(
                            {userId: results[0].id}, `${process.env.CLE}`,
                            { expiresIn: '24h'}),
                        role: results[0].roles
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
    
    const sql = `SET @email="${buffer}", @username="${req.body.username}"`;
    connection.query(sql, (error, results, fields) => {

        if (error) {
            res.status(500).json({message: 'erreur database'})
        } 
        else if(results) {
            
            const sql = `CALL delete_user(@username, @email);`;
            connection.query(sql, (error, results, fields) => {

                if (results[0].length == 0 || error) { /* Si le tableau ne renvoie aucun resultat (id n'existe pas), la longueur du 1er array est donc vide */
                    res.status(500).json({message: "cet utilisateur n'existe pas"})
                   
                } else if(results[0].length == 1) { /* Si le tableau renvoie bien une donnée password, la longueur du 1er array est donc de 1 */
                    let getPassword = results[0] /* recupere le array contenant le array password */
                        
                    bcrypt.compare(req.body.password, getPassword[0].password) /* Je vérifie le password avant la suppression */
                    .then(valid => {
                        if (!valid){
                        return res.status(400).json({message: "Ce mot de passe n'est pas valide"})
                        }
                        const sql = `DELETE FROM users WHERE email=@email AND username=@username`;
                        connection.query(sql, (error, results, fields) => {

                            if (error) {
                                res.status(500).json({message: 'erreur database'})
                            } else if(results) {
                                return res.status(200).json({message: "Votre compte a bien été supprimé"})
                            }
                        });
                    })
                    .catch(() => res.status(500).json({message: "erreur login"}))

                }
            })
        }  
    });
}

