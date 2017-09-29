var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


/**
 * Club Schema
 * @param {string} name - Club's name.
 * @param {array} address - Array of Club's addresses.
 * @param {array} phoneNumber - Club's phone number and Whatsapp.
 * @param {Fields} fields - Array of Club's soccer fields.
 * @param {array} services - Club's services.
 * @param {Usuario} user - Club's user.
 */

var clubSchema = new Schema({
    name: { type: String, required: true, index: true },
    address: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
        address: {type: String, required: true}
    },
    phoneNumber: String,
    fields: [{ type: ObjectId, ref: 'Cancha' }],
    /*fields: [{
        description: String,
        cantPlayers: { type: Number, required: true },
        fieldType : String,
        services: [{
            display: { type: String, required: true },
            value: String
        }]
    }],*/
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
    profileImg: {type: String, required: true},
    galleryImg: [String],
    description: String
});

clubSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    console.log('Se tiene que borrar el usuario');
    this.model('User').remove({ user: this._id }, next);
    //this.model('Field').remove({ fields: this._id });
    console.log('Se supone que se borra ._.');
});

module.exports = mongoose.model('Club', clubSchema);
