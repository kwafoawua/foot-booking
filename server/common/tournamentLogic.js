const Tournament = require('../models/Tournament');

exports.hasATournament = async clubId => await Tournament.countDocuments({
    creatorClubId: clubId,
    "status": {$nin: ['Nuevo', 'Cancelado']}
}) > 0;
