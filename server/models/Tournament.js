var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
/**
 * Torunament Schema
 * @param {string} name - Tournament's name.
 * @param {Date} initDate - Tournament's starting date.
 * @param {Date} endDate - Tournament's ending date.
 * @param {string} status - Tournament's status based on the DTE.
 * @param {Club} club - Club owner of the tournament.
 * @param {array} fase - Stages of the tournament.
 */

const tournamentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 255, required: true },
    inicioInscripcion: { type: Date, required: true },
    finInscripcion: { type: Date, required: true },
    inicioCampeonato: { type: Date, required: true },
    finCampeonato: { type: Date },
    cantEquipos: { type: String },
    costoInscripcion: { type: Number, required: true },
    tipoCompetencia: {type: String, required: true},
    categoria: { type: String, required: true},
    premios: {
        firstPlace: {type: String, required: true},
        secondPlace: String,
        thirdPlace: String,
    },
    terminosCondiciones: { type: String, required: true },
    clubId: { type: String, required: true },
    estado: {type: String, default: 'Nuevo', enum: ['Nuevo', 'Publicado', 'Iniciado', 'Finalizado', 'Cancelado']},
    equipos:[{
        name: String,
        responsableEquipo: {
            nombre: { type: String},
            apellido: { type: String },
            email: { type: String },
            telefono: { type: Number }
        },
        cantPlayers: { type: Number },
        fechaInscripcion : { type: Date, default: Date.now },
    }],
});

module.exports = mongoose.model('Tournament', tournamentSchema);
