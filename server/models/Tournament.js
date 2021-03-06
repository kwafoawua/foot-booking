const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

/**
 * Tournament Schema
 * @param {String} creatorClubId - _id of tournament creator.
 * @param {String} tournamentName - Tournament's name.
 * @param {String} description - Tournament description.
 * @param {String} image - Image of the Tournament.
 * @param {Date} startDate - Tournament's starting date.
 * @param {Date} endDate - Tournament's ending date.
 * @param {Number} numbersOfTeams - Maximum number of teams.
 * @param {Number} prizeAmount - Prize amount for the winner team.
 * @param {Date} inscriptionStartDate - Tournament inscription starting date.
 * @param {Date} inscriptionEndDate - Tournament inscription starting date.
 * @param {Number} inscriptionCost - Value of the inscription.
 */
const TournamentSchema = new mongoose.Schema({
    creatorClubId: {type: mongoose.Schema.Types.ObjectId, ref: 'Club', requiered: true},
    tournamentName: {type: String, requiered: true, trim: true},
    description: {type: String, maxLength: 255, trim: true},
    startDate: {type: Date, requiered: true, trim: true},
    endDate: {type: Date, requiered: true, trim: true},
    numbersOfTeams: {type: Number, requiered: true, trim: true},
    inscriptionStartDate: {type: Date, requiered: true, trim: true},
    inscriptionEndDate: {type: Date, requiered: true, trim: true},
    inscriptionCost: {type: Number, requiered: true, trim: true},

    publicationDescription: {type: String, maxLength: 1500, trim: true},
    prize1: {type: String, requiered: true},
    prize2: String,
    prize3: String,
    numberOfPlayers: {type: String, requiered: true, trim: true},
    state: {
        type: String, default: 'Nuevo', requiered: true, trim: true,
        enum: ['Nuevo', 'Publicado', 'Completado','Iniciado', 'Finalizado', 'Cancelado']
    },
    category: {type: String, requiered: true, trim: true},
    termsAndConditions: {type: String, requiered: true},
    equipos: [{
        name: String,
        responsableEquipo: {
            nombre: {type: String},
            apellido: {type: String},
            email: {type: String},
            telefono: {type: Number}
        },
        cantPlayers: {type: Number},
        fechaInscripcion: {type: Date, default: Date.now},
    }]
});

TournamentSchema.plugin(mongoose_delete, {overrideMethods: 'all'});

module.exports = mongoose.model('Tournament', TournamentSchema);
