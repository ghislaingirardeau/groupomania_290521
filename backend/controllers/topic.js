/* CONNECTION MYSQL */
const mysql = require('mysql')
const config = require('../config')
const connection = mysql.createConnection(config)


exports.allTopics = (req, res, next) => { /* AFFICHE TOUS LES SUJETS PAR DATE DE CREATION ET LES 3 DERNIERS SUJETS COMMENTÉS */
    
    const sql = `CALL list_topics();`
    connection.query(sql, (error, results, fields) => {

        if (error) {
            res.status(400).json({message: "Impossible d'afficher les sujets"})
        } else if (results) {
            res.status(200).json({AllTopic: results[0], lastTopicComment: results[1]})
        }
    })
}

exports.createTopic = (req, res, next) => { 
   
    if (req.body.topic != undefined) {
        
        const sql = `SET @user_id="${req.body.user_id}", @topic="${req.body.topic}"`
        connection.query(sql, (error, results, fields) => {

            if (error) {
                res.status(500).json({message: 'erreur database'})
            } else if (results) {

                const sql = `CALL post_topic(@user_id, @topic);` /* parametre user id INT unsigned pour chaque requete */
                connection.query(sql, (error, results, fields) => {
                    
                if (error) {
                    res.status(400).json({message: "Erreur de creation du sujet"})
                } else if (results) {
                    res.status(201).json({message: "Le sujet est bien créé"})
                }
                })
            }
        })  
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}

