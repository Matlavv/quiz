const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //npm install --save mongoose-unique-validator   pour assurer qu'il ne peut pas y avoir deux fois le même mail

const userSchema = mongoose.Schema({   //enregistrer dans un schéma les infos user
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);  //exporter pour récup le schéma de donnée