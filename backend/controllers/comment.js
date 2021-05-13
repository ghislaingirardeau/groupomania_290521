/* CONNECTION MYSQL */
const mysql = require('mysql')
const config = require('../config')
const connection = mysql.createConnection(config)

exports.allComments = (req, res, next) => {

    const sql = `CALL list_comments(${req.params.topic_id});`
    connection.query(sql, (error, results, fields) => {

        if (error) {
            res.status(400).json({message: "Impossible d'afficher les commentaires"})
        } else if (results[1].length == 0) { /* results[1] correspond a l'objet subject, results[0] correspond a l'objet comment, */
        /* utilise results[1] pour verifier que le sujet existe bien (qu'il y ait deja des commentaires ou non)  */
            res.status(400).json({message: "Ce sujet n'existe pas"})
        } else if (results[1].length == 1) {
            res.status(200).json({comments: results[0], subject: results[1]})
        }
    })
}

exports.addComment = (req, res, next) => {  /* recup de pseudo_id ??? */
    
    if (req.body.comment != undefined) { /* TRIGGER after_insert_comment pour mettre a jour la date de modification du commentaire dans la table sujet */
        
        const sql = `SET @user_id="${req.body.user_id}", @comment="${req.body.comment}", @topic_id="${req.params.topic_id}"`
        connection.query(sql, (error, results, fields) => {

            if (error) {
                res.status(500).json({message: 'erreur database'})
            } else if (results) {
                
                const sql = `CALL add_comment(@user_id, @topic_id, @comment)`
                connection.query(sql, (error, results, fields) => {
                    if (error) {
                        res.status(400).json({message: "Impossible d'ajouter les commentaires"})
                    } else if (results) {
                        res.status(201).json({message: "Votre commentaire a bien été ajouté"})
                    }
                })
            }
        }) 
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}

exports.removeComment = (req, res, next) => {
    
    const sql = `SET @user_id="${req.body.user_id}", @comment="${req.params.comment_id}"`
        connection.query(sql, (error, results, fields) => {

            if (error) {
                res.status(500).json({message: 'erreur database'})
            } else if (results) {

            const sql = `CALL delete_comment(@comment, @user_id);` 
            /* Reduire les risques d'injections avec une procedure stocké ajoutant un type INT a req.params.comment_id */
            connection.query(sql, (error, results, fields) => {

                if (error || results.length == 2 || results.affectedRows == 0) { 
                    /* si Id n'existe pas renverra 2 ligne ou si Id ne correspond pas au select renverra 0 affectedRows   */
                    res.status(400).json({message: "Echec de la suppression du commentaire"})
                } else if (results) {
                    res.status(200).json({message: "Le commentaire a bien été supprimé"})
                }
            })
        }
    })
}

exports.modifyComment = (req, res, next) => {
    
    if (req.body.comment != undefined) {/* TRIGGER after_update_comment pour mettre a jour la date de modification du commentaire dans la table sujet */
        const sql = `SET @user_id="${req.body.user_id}", @commentId="${req.params.comment_id}", @commentUpdated="${req.body.comment}"`
        connection.query(sql, (error, results, fields) => {

            if (error) {
                res.status(500).json({message: 'erreur database'})
            } else if (results) {

                const sql = `CALL modify_comment(@commentId, @user_id, @commentUpdated)`
                /* Reduire les risques d'injections avec une procedure stocké ajoutant un type INT a req.params.comment_id */
                connection.query(sql, (error, results, fields) => {
                    
                    if (error || results.length == 2 || results.affectedRows == 0) {
                        res.status(400).json({message: "Impossible de modifier les commentaires"})
                       
                    } else if (results) {
                        res.status(201).json({message: "Commentaire modifié"})
                    }
                })
            }
        })     
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}
