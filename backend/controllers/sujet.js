/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);


exports.listeSujet = (req, res, next) => { /* AFFICHE TOUS LES SUJETS PAR DATE DE CREATION ET LES 3 DERNIERS SUJETS COMMENTÉS */
    
    const sql = `CALL afficher_sujets;`
    
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les sujets"})
        } else if (results) {
            res.status(200).json({Sujets: results[0], dernierSujetCommenté: results[1]})
        }
    })
}


exports.creerSujet = (req, res, next) => { /* recup de pseudo_id ??? */
   
    if (req.body.sujet != undefined) {
        const sql = `INSERT INTO Sujet (sujet, pseudo_id, Date_creation) 
        VALUES ("${req.body.sujet}", "${req.body.pseudo_id}", (SELECT NOW()));`
    
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(401).json({message: "Erreur de creation du sujet"})
            } else if (results) {
                console.log(results)
                res.status(201).json({message: "Le sujet est bien créé"})
            }
        })
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
    
}

exports.listeCommentaires = (req, res, next) => {

    const sql = `CALL afficher_commentaires(${req.params.sujet_id});`

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les commentaires"})
        } else if (results) {
            
            res.status(200).json({commentaires: results[0], sujet: results[1]})
        }
    })
}

exports.ajoutCommentaire = (req, res, next) => {  /* recup de pseudo_id ??? */
    
    if (req.body.comment != undefined) { /* TRIGGER after_insert_comment pour mettre a jour la date de modification du commentaire dans la table sujet */
        const sql = `INSERT INTO Commentaire (sujet_id, pseudo_id, Date_commentaire, commentaire_user) 
        VALUES ("${req.params.sujet_id}", '${req.body.pseudo_id}', (SELECT NOW()), "${req.body.comment}");`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(401).json({message: "Impossible d'ajouter les commentaires"})
            } else if (results) {
                console.log(results)
                res.status(201).json({message: "Commentaire ajouté"})
            }
        })
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}

exports.suppressionCommentaire = (req, res, next) => {
    
    const sql = `CALL remove_comment(${req.params.commentaire_id});` 
/* Reduire les risques d'injections avec une procedure stocké ajoutant un type INT a req.params.commentaire_id */
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Echec suppression"})
        } else if (results) {
            console.log(results)
            res.status(200).json({message: "Commentaire supprimé"})
        }
    })
}

exports.modifCommentaire = (req, res, next) => {
    
    if (req.body.comment != undefined) {/* TRIGGER after_update_comment pour mettre a jour la date de modification du commentaire dans la table sujet */

        const sql = `CALL modif_comment(${req.params.commentaire_id}, "${req.body.comment}")`
/* Reduire les risques d'injections avec une procedure stocké ajoutant un type INT a req.params.commentaire_id */
        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(401).json({message: "Impossible de modifier les commentaires"})
            } else if (results) {
                console.log(results)
                res.status(201).json({message: "Commentaire modifié"})
            }
        })
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}
