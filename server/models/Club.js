const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
/**
 * Club Schema
 * @param {string} name - Club's name.
 * @param {array} address - Array of Club's addresses.
 * @param {array} phoneNumber - Club's phone number and Whatsapp.
 * @param {Fields} fields - Array of Club's soccer fields.
 * @param {array} services - Club's services.
 * @param {Usuario} user - Club's user.
 */

var clubSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    email: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    rol: { type: String, default: 'Club' },
    address: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        address: {type: String, required: true},
        shortAddress: {type: String, required: true},
    },
    phoneNumber: String,
   // fields: [{ type: ObjectId, ref: 'Cancha' }],
    fields: [{
        fieldName: String,
        cantPlayers: { type: Number, required: true },
        fieldType : String,
        services: [{
            display: { type: String, required: true },
            value: String
        }],
        price: Number
    }],
    services: [{
        display: { type: String, required: true },
        value: { type: String}
    }],
    socialMedia: {
        facebookId: String,
        twitterId: String,
        instagramId: String,
        snapchatId: String,
        googleId: String
    },
    // coments: [{
    //     description: String,
    //     user:String
    // }],
    profileImg: {type: String, required: true},
    galleryImg: [String],
    description: String,
    status: {
        type: String,
        default: 'Pendiente',
        required: true,
        enum: ['Pendiente', 'Activo', 'Eliminado']
    }, //modificar con los estados verdaderos
    //token de Mercado de Pago para este club
    access_token: String,
});

clubSchema.plugin(mongoosePaginate);

clubSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    console.log('Se tiene que borrar el usuario');
    this.model('User').remove({ user: this._id }, next);
    //this.model('Field').remove({ fields: this._id });
    console.log('Se supone que se borra ._.');
});

module.exports = mongoose.model('Club', clubSchema);
