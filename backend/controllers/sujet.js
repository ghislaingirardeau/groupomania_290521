/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);


exports.listeSujet = (req, res, next) => {
    
    const sql = `SELECT * FROM Sujet`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les sujets"})
        }
        console.log(results)
        res.status(200).json(results)
    });
}

exports.creerSujet = (req, res, next) => { /* recup de pseudo_id ??? */
   
    const sql = `INSERT INTO Sujet (sujet, pseudo_id, Date_creation) 
    VALUES ("${req.body.sujet}", "${req.body.pseudo_id}", (SELECT NOW()));`

    connection.query(sql, (error, results, fields) => {
        if (error || req.body.sujet === undefined || req.body.sujet === '') {
            res.status(401).json({message: "Erreur de creation du sujet"})
        } else if (results) {
            console.log(results)
            res.status(201).json(results)
        }
    })
}

exports.listeCommentaires = (req, res, next) => {

    const sql = `SELECT commentaire_user FROM commentaire WHERE sujet_id=${req.params.sujet_id}`

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les commentaires"})
        }
        console.log(results)
        res.status(200).json(results)
    });
}

exports.ajoutCommentaire = (req, res, next) => {  /* recup de pseudo_id ??? */
    
    if (req.body.comment != undefined) {
        const sql = `INSERT INTO Commentaire (sujet_id, pseudo_id, Date_commentaire, commentaire_user) 
        VALUES ("${req.params.sujet_id}", '${req.body.pseudo_id}', (SELECT NOW()), "${req.body.comment}");`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(401).json({message: "Impossible d'ajouter les commentaires"})
            } else if (results) {
                console.log(results)
                res.status(201).json({message: "Insertion ok"})
            }
        });
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}

exports.suppressionCommentaire = (req, res, next) => {
    
    const sql = `CALL remove_comment(${req.params.commentaire_id});`

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Echec suppression"})
        } else if (results) {
            console.log(results)
            res.status(200).json({message: "Commentaire supprimé"})
        }
    });
}

exports.modifCommentaire = (req, res, next) => {
    
    if (req.body.comment != undefined) {
        const sql = `UPDATE commentaire SET commentaire_user="${req.body.comment}" WHERE id=${req.params.commentaire_id} ;`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                res.status(401).json({message: "Impossible de modifier les commentaires"})
            } else if (results) {
                console.log(results)
                res.status(201).json({message: "Commentaire modifié"})
            }
        });
    } else {
        res.status(400).json({message: "Champs non valide"})
    }
}
