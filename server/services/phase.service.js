const mongoose = require('mongoose');
const Phase = require('../models/Phase');

exports.getPhaseTypeNameForMatchId = async (tournamentId, matchId) => {
    const identifier = await Phase.findOne({
            tournamentId: mongoose.Types.ObjectId(tournamentId),
            'matches._id': matchId
        }
    );
    return identifier._doc.phaseType;
}
