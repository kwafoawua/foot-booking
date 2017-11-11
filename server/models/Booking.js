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
    field: {
        id: String,
        fieldName: String,
        cantPlayers: { type: Number, required: true },
        fieldType : String,
       //services: [ { type: String, required: true }],
         price: String
    },
    playingDate: { type: Date, required: true },
    playingTime: String,
    status: { type: String, default: 'Reservado', required: true, enum: ['Cancelado', 'Finalizado', 'Reservado'] }, //modificar con los estados verdaderos
        paidMethod: {type: String, required: true},
    player: {
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        phoneNumber: Number,
        id: {type: String}

    }
    //es que reservan la cancha todos los martes
    //regularBooking: { type: Boolean, required: true, default: true },
    //endingDateRegularBooking: Date

});

module.exports = mongoose.model('Booking', bookingSchema);
