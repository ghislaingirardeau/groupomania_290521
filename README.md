LANCEMENT MVP Projet 7 Groupomania

--COPY REPOSITORY Groupomania--

--LANCEMENT BACKEND--

cd backend 
npm run server (actualisation en live du server si modification) 
ou npm run dev
lance API sur http://localhost:3000/

-- LANCEMENT FRONTEND --

cd frontend
cd groupomania-vue-cli-app
npm run serve
lance le projet sur http://localhost:8080/

-- Fichier DATABASE --

dans le dossier backend/node-mysql
groupomania_DB.sql

-- fichier .env = /backend/.env.dev --

AJOUTER LE FICHIER .env.dev DANS LE DOSSIER /BACKEND avant le lancement du serveur

Notice fichier .env:

User: nom utilisateur MYSQL
password: mot de passe
database: nom de la base de donnée
cle: mot de passe associé a la cle TOKEN
Encodage: encodage utilisé pour la convertion de l'email en buffer