var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * TournamentArrays Schema
 */

var tournamentArraysSchema = new Schema({
    tipoCompeticion: {
    	type: String,
    	enum: ['5 Jugadores', '6 Jugadores', '7 Jugadores', '9 Jugadores', '11 Jugadores']
    },
    categoria: {
    	type: String,
    	enum: ['Femenino', 'Masculino', 'Mixto', 'Junior', 'Amateur', 'Veteranos', 'Comercial']
    },
    estadoTorneo: {
    	type: String,
    	enum: ['Creado', 'Publicado', 'En curso', 'Finalizado', 'Cancelado', 'Suspendido']
    }
});

module.exports = mongoose.model('TournamentArrays', tournamentArraysSchema);