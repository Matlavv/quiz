const express = require('express');
const auth = require('auth');

const router = express.Router();


router.use((auth, req, res, next) => {    //middlewares
    console.log('Requête reçue');
    next(); //passer à la fonction suivante
});

router.use((auth, req, res, next) => {
    res.status(201);
    next();
});

router.use((auth, req, res, next) => {
    res.json({message :'Votre requete à bien été recue !'})   //renvoyer en json la réponse qui sera récuperée dans la const server de server.js
    next();
});

router.use((auth, req, res) => {
    console.log('Réponse envoyée avec succès');
});

router.post('');

module.exports = router;