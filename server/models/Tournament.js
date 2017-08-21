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
    initDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: 'Creado', required: true, enum: ['Creado', 'Vigente'] },
    tournamentType: { type: String, required: true },
    //club: { type: ObjectId, ref: 'Club' },//poner los datos que van a necesitar del club
    club: {
        id: {type: Number, ref: 'Club'},
        name: String,
        currentAddress: {
            street: { type: String, required: true },
            location: { type: [Number], required: true } //[Lat, Long]
        }
    },
    stage: [{
        cant: { type: Number, required: true },
        name: { type: String, required: true },
        initDate: { type: Date, default: Date.now, required: true },
        endDate: { type: Date, default: Date.now, required: true },
        game: [{ type: ObjectId, ref: 'Game' }]

    }],
    cantTeams: Number,
    rules: [{type: String}]

});

module.exports = mongoose.model('Tournament', tournamentSchema);
