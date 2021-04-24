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
    VALUES ("${req.body.sujet}", "1", (SELECT NOW()));`
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les sujets"})
        }
        console.log(results)
        res.status(200).json(results)
    });
}

exports.listeCommentaires = (req, res, next) => {

    console.log(req.params.sujet_id)
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
    let id = req.params.sujet_id
    let comment = req.body.comment
    const sql = `INSERT INTO Commentaire (sujet_id, pseudo_id, Date_commentaire, commentaire_user) 
        VALUES ("${id}", '1', (SELECT NOW()), "${comment}");`
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'ajouter les commentaires"})
        }
        console.log(results)
        res.status(200).json({message: "Insertion ok"})
    });
}

exports.suppressionCommentaire = (req, res, next) => {

}
