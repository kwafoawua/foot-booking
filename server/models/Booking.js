var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

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
    mpExternalReference: String,
    isTournamentBooking: {
        type: Boolean,
        default: false
    },
    tournamentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', requiered: false},
    createdOn: {type: Date, default: Date.now},
    club: {
        id: {type: String, required: true},
        name: String,
        address: String,
        phoneNumber: Number
    },
    field: {
        id: String,
        fieldName: String,
        cantPlayers: {type: Number, required: true},
        fieldType: String,
        services: [{
            display: {type: String, required: true},
            value: String
        }],
        price: Number

    },
    playingDate: {type: Date, required: true},
    playingTime: String,
    status: {
        type: String,
        default: 'Reservado',
        required: true,
        enum: ['Asistido', 'Cancelado', 'Ausente', 'Reservado']
    },
    paidMethod: {
        type: String,
        default: 'En sitio',
        required: true
    },
    player: {
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        phoneNumber: Number,
        id: {type: String},
        dni: {type: Number},
        email: {type: String},
    },
    payment: {
        date: Date,
        fee: Number
    },
    paymentStatus: {
        type: String,
        default: 'Pendiente de Pago',
        required: true,
        enum: ['Pendiente de Pago', 'Pago Parcial', 'Pago Total', 'Reembolso']
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

// Returns an array of all possible role enum values
bookingSchema.virtual('estados').get(function () {
    return bookingSchema.path('status').enumValues;
});

bookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Booking', bookingSchema);


