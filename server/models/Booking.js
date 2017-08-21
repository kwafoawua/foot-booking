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
    date: { type: Date, default: Date.now },
    field: { 
        description: String,
        cantPlayers: { type: Number, required: true },
        services: [{
            name: { type: String},
            description: String}]
        },
    bookingDate: { type: Date, required: true },
    status: { type: String, default: 'Esperando', required: true, enum: ['Declinado', 'Aceptado', 'Esperando'] }, //modificar con los estados verdaderos
    payment: {paidMethod: {type: String, required: true},
        reference: {type: String, required: true}
        },
    player: {
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        userName: {type: String, required: true},

    },
    regularBooking: { type: Boolean, required: true },
    endingDateRegularBooking: Date

});

module.exports = mongoose.model('Booking', bookingSchema);
