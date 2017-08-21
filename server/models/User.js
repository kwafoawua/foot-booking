'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

/*** User Schema
 * @param { string } username - Nombre de usuario único requerido.
 * @param { string } password - Password requerida.
 * @param { string } rol - Rol que identifica el tipo de usuario.
 */

var userSchema = new Schema({
    username: { type: String, unique: true, required: true, index: true, lowercase: true },
    password: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    createdOn: { type: Date, default: Date.now},
    creator: {type: Schema.ObjectId, required: true},
    rol: String

});


userSchema.methods.setPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setCreator = function (role) {};


module.exports = mongoose.model('User', userSchema);
