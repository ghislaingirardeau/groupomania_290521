/* CONNECTION MYSQL */

/* Pour une connection en ligne à mysql exporter configWeb (par défaut) */
let configWeb = {
    host: 'db4free.net',
    port: 3306,
    user: `${process.env.USER_DB}`,
    password: `${process.env.PASSWORD_DB}`,
    database: `${process.env.DATABASE_DB}`
}

/* Pour une connection en locale à mysql exporter config */
let config = {
    host: 'localhost',
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
}

module.exports = config; /* Changer ici le choix de la connection */