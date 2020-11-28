const TournamentInscription = require('../models/TournamentInscription');

exports.getNumberOfInscriptions = async tournamentId => {
       return await Promise.resolve(TournamentInscription.countDocuments({tournamentId: tournamentId}));
}

exports.getInscriptions = async tournamentId => {
       return await Promise.resolve(TournamentInscription.find({tournamentId: tournamentId}));
}
