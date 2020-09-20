const TournamentInscription = require('../models/TournamentInscription');
const mongoose = require('mongoose');

exports.getAllTeamsRegistered = async tournamentId =>
    await TournamentInscription.find({tournamentId: mongoose.Types.ObjectId(tournamentId)}).select('team.name');

