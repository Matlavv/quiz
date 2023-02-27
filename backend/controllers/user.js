const bcrypt = require('bcrypt');   //npm install --save bcrypt   chiffer le mdp
const jwt = require('jsonwebtoken');   //npm install --save jsonwebtoken
const User = require('../models/User');   //récup les méthodes de User.js

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)    //Crypter le mdp
    .then(hash => {    
        const user = new User({   //récup le mdp crypté et l'ajouter dans le nouvel User
            email: req.body.email,
            password: hash
        });
        user.save()   //enregistrer dans la BDD
        .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})  //récup l'email
    .then(user => {
        if (user === null) {    //Si il n'y a pas cet email enregistré alors renvoyer une erreur
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
        } else {  
            bcrypt.compare(req.body.password, user.password)   //comparer les mdp avec bcrypt
            .then(valid => {
                if (!valid) {   //Si le mdp entré est incorrect
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },   //encoder l'Id pour identifier chaque User
                            'RANDOM_TOKEN_SECRET',  //chiffer le token 
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch( error => {res.status(500).json( { error })})
        }
    })
    .catch(error => {res.status(500).json( { error })});
};

