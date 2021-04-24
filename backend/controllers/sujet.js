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
        /* res.status(200).json(results) */
    });
    connection.end();
}

exports.creerSujet = (req, res, next) => {
    
    const sql = `INSERT INTO Sujet (sujet, pseudo_id, Date_creation) 
    VALUES ("${req.body.sujet}", "1", (SELECT NOW()));`
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(400).json({message: "Impossible d'afficher les sujets"})
        }
        console.log(results)
        res.status(200).json(results)
    });
    connection.end();
}

let date = Date.now().toString()
console.log(date)



