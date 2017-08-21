var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Game Schema
 * @param {Date} date - Nombre del complejo.
 * @param {Field} field - Array de domicilios del Complejo.
 * @param {Date} bookingDate - Telefono del complejo.
 * @param {String} status - Array de Canchas del complejo.
 * @param {String} payment - Serivicios que ofrece el Complejo.
 * @param {} usuario - Usuario al cual pertenece el complejo.
 */

var gameSchema = new Schema({
    date: {type:Date, required: true},
    startingTime: Date,
    endingTime: Date,
    team1: {teamName: String,
    	players: [{name: String}]
    },
    team2: {teamName: String,
    	players: [{name: String}]
    },
    status: { type: String, default: 'Creado', required: true, enum: ['Creado', 'Vigente'] },
    referee: {type: String, required: true},
    result: ResultadoPartido,


});

module.exports = mongoose.model('Game', gameSchema);
