var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Booking Schema
 * @param {Date} date - Día en que se hizo la reserva.
 * @param {Field} field - Selected Field.
 * @param {Date} bookingDate - Fecha para la cual se va a jugar.
 * @param {String} status - Status of the booking.
 * @param {String} payment - Payment.
 * @param {Player} player - Player attributes plus user
 * @param {Boolean}
 */

var bookingSchema = new Schema({
    createdOn: { type: Date, default: Date.now },
    club: {
        id: {type: String, required: true},
        name: String,
        address: String,
        phoneNumber: Number
    },
    fields: {
        fieldName: String,
        cantPlayers: { type: Number, required: true },
        fieldType : String,
        services: [{
            display: { type: String, required: true },
            value: String
        }],
        // price: String
    },
    playingDate: { type: Date, required: true },
    playingTime: String,
    status: { type: String, default: 'Esperando', required: true, enum: ['Declinado', 'Aceptado', 'Esperando'] }, //modificar con los estados verdaderos
    payment: {
        paidMethod: {type: String, required: true},
        reference: {type: String, required: true}
        },
    player: {
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        userName: {type: String, required: true},
        phoneNumber: Number,
        id: {type: String}

    },
    regularBooking: { type: Boolean, required: true },
    endingDateRegularBooking: Date

});

module.exports = mongoose.model('Booking', bookingSchema);
