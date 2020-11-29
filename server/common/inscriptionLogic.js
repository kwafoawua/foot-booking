const mongoose = require('mongoose');
const TournamentInscription = require('../models/TournamentInscription');
const Tournament = require('../models/Tournament');

exports.getAllTeamsRegistered = async tournamentId =>
    await TournamentInscription.find({
        tournamentId: mongoose.Types.ObjectId(tournamentId),
        paymentStatus: 'Pagado'
    }).select('team.name');

exports.availableDateForInscription = async tournamentId => await Tournament.find({tournamentId: mongoose.Types.ObjectId(tournamentId)}).select('inscriptionEndDate')


