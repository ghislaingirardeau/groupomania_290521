LANCEMENT MVP Projet 7 Groupomania

--COPY REPOSITORY Groupomania--

--LANCEMENT BACKEND--
!! AJOUTER LE FICHIER .env.dev DANS LE DOSSIER /BACKEND avant le lancement du serveur !ID de c
cd backend 
npm run server (actualisation en live du server si modification) 
ou npm run dev
lance API sur http://localhost:3000/

-- LANCEMENT FRONTEND --

cd frontend
cd groupomania-vue-cli-app
npm run serve
lance le projet sur http://localhost:8080/

-- Connection DATABASE --

    #En local : 
    Importer le fichier groupomania_save.sql dans mysql qui se trouve
    dans le dossier backend/node-mysql

    Dans le fichier /Backend/config.js, exporter la variable 'config'

    #En ligne (par defaut):
    Dans le fichier /Backend/config.js, exporter la variable 'configWeb'

-- fichier .env = /backend/.env.dev --

!! AJOUTER LE FICHIER .env.dev DANS LE DOSSIER /BACKEND avant le lancement du serveur !!

Notice fichier .env:

    #ID de connection mysql en local :
        USER: nom utilisateur MYSQL
        PASSWORD: mot de passe
        DATABASE: nom de la base de donnée

    #ID de connection mysql en ligne :
        USER_DB: nom utilisateur PHPmyadmin
        PASSWORD_DB: mot de passe
        DATABASE_DB: nom de la base de donnée sur PHPmyadmin

    #cle: mot de passe associé a la cle TOKEN
    #Encodage: encodage utilisé pour la convertion de l'email en buffer