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

var tournamentSchema = new Schema({

    name: { type: String, required: true },
    description: { type: String, maxLength: 255, required: true },
    inicioInscripcion: { type: Date, required: true },
    finInscripcion: { type: Date, required: true },
    inicioCampeonato: { type: Date, required: true },
    finCampeonato: { type: Date },
    cantEquipos: { type: String, required: true },
    fee: { type: Number, required: true },
    clubId: { type: Number, required: true }

});

module.exports = mongoose.model('Tournament', tournamentSchema);