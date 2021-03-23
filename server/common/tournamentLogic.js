const Tournament = require('../models/Tournament');

exports.hasATournament = async clubId => await Tournament.countDocuments({
    creatorClubId: clubId,
    "state": {$nin: ['Nuevo', 'Cancelado']}
}) > 0;
