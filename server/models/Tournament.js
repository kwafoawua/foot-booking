const mongoose = require('mongoose');

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
    image: {type: String},
    startDate: {type: Date, requiered: true, trim: true},
    endDate: {type: Date, requiered: true, trim: true},
    numbersOfTeams: {type: Number, requiered: true, trim: true},
    prizeAmount: {type: Number, requiered: true, trim: true},
    // inscripciones pueden ser un doc aparte
    inscriptionStartDate: {type: Date, requiered: true, trim: true},
    inscriptionEndDate: {type: Date, requiered: true, trim: true},
    inscriptionCost: {type: Number, requiered: true, trim: true}
});

module.exports = mongoose.model('Tournament', TournamentSchema);