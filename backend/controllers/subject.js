/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);


exports.allTopics = (req, res, next) => { /* AFFICHE TOUS LES SUJETS PAR DATE DE CREATION ET LES 3 DERNIERS SUJETS COMMENTÉS */
    
    const sql = `CALL show_topics();`
    
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
        const sql = `INSERT INTO Subject (topic, user_id, Date_creation) 
        VALUES ("${req.body.topic}", "${req.body.user_id}", (SELECT NOW()));`
    
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({message: "Erreur de creation du sujet"})
            } else if (results) {
                res.status(201).json({message: "Le sujet est bien créé"})
            }
        })
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}

exports.allComments = (req, res, next) => {

    const sql = `CALL show_comment(${req.params.topic_id});`

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les commentaires"})
        } else if (results[1].length == 0) {
            res.status(400).json({message: "Ce sujet n'existe pas"})
        } else if (results.length > 0) {
            res.status(200).json({comments: results[0], sujet: results[1]})
        }
    })
}

exports.addComment = (req, res, next) => {  /* recup de pseudo_id ??? */
    
    if (req.body.comment != undefined) { /* TRIGGER after_insert_comment pour mettre a jour la date de modification du commentaire dans la table sujet */
        const sql = `INSERT INTO Comment (topic_id, user_id, date_comment, user_comment) 
        VALUES ("${req.params.topic_id}", '${req.body.user_id}', (SELECT NOW()), "${req.body.comment}");`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({message: "Impossible d'ajouter les commentaires"})
            } else if (results) {
                res.status(201).json({message: "Commentaire ajouté"})
            }
        })
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}

exports.removeComment = (req, res, next) => {
    
    const sql = `CALL remove_comment(${req.params.comment_id}, "${req.body.user_id}");` 
/* Reduire les risques d'injections avec une procedure stocké ajoutant un type INT a req.params.comment_id */
    connection.query(sql, (error, results, fields) => {
        if (error || results.length == 2 || results.affectedRows == 0) { /* si Id n'existe pas renverra 2 ligne ou si Id ne correspond pas au select renverra 0 affectedRows   */
            res.status(400).json({message: "Echec de la suppression du commentaire"})
        } else if (results) {
            res.status(200).json({message: "Le commentaire a bien été supprimé"})
        }
    })
}

exports.modifyComment = (req, res, next) => {
    
    if (req.body.comment != undefined) {/* TRIGGER after_update_comment pour mettre a jour la date de modification du commentaire dans la table sujet */

        const sql = `CALL modify_comment(${req.params.comment_id}, "${req.body.user_id}", "${req.body.comment}")`
/* Reduire les risques d'injections avec une procedure stocké ajoutant un type INT a req.params.comment_id */
        connection.query(sql, (error, results, fields) => {
            if (error || results.length == 2 || results.affectedRows == 0) {
                res.status(400).json({message: "Impossible de modifier les commentaires"})
               
            } else if (results) {
                res.status(201).json({message: "Commentaire modifié"})
            }
        })
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}