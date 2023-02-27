const express = require('express');   //importer express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  //npm install body-parser
const stuffRoutes = require('./routes/stuff.js');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://matlav:matlav@oc.mybjfcp.mongodb.net/?retryWrites=true&w=majority',  //connecter à la BDD
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();   //notre app

app.use('/api/stuff', stuffRoutes);
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
module.exports = app;   //exporter l'app pour pouvoir l'utiliser dans les autres fichiers