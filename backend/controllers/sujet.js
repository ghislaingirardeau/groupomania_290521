/* CONNECTION MYSQL */
const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config);


exports.listeSujet = (req, res, next) => { /* AFFICHE LES 3 DERNIERS SUJETS CRÉÉS ET LE DERNIER SUJET COMMENTÉ */
    
    const sql = `(SELECT sujet.id AS id_sujet, sujet, Pseudo, Date_creation FROM sujet INNER JOIN users ON sujet.pseudo_id=users.id ORDER BY Date_creation DESC LIMIT 3) 
                UNION ALL 
                (SELECT sujet.id AS id_sujet, sujet, Pseudo, Date_creation FROM sujet INNER JOIN users ON sujet.pseudo_id=users.id WHERE sujet.id=(SELECT sujet_id FROM commentaire ORDER BY Date_commentaire DESC LIMIT 1));`
    
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les sujets"})
        } else if (results) {
            const dernierSujetCommenté = results.pop()
            const sujetsRecents = results
            res.status(200).json({sujetsRecents, dernierSujetCommenté})
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

    const sql = `SELECT commentaire_user, Date_commentaire, pseudo FROM commentaire INNER JOIN users 
                ON users.id=commentaire.pseudo_id WHERE sujet_id=${req.params.sujet_id} ORDER BY Date_commentaire ASC;`

    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les commentaires"})
        } else if (results) {
            console.log(results)
            res.status(200).json(results)
        }
    })
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
    
    if (req.body.comment != undefined) {

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
