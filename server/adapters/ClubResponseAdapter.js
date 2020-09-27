const tournamentLogic = require('../common/tournamentLogic');

exports.adaptClubResponse = async club => {
    const hasATournament = await tournamentLogic.hasATournament(club._doc._id);
    return {
        ...club._doc,
        hasATournament: hasATournament
    }
};

exports.adaptClubs = async clubs => await Promise.all(clubs.map(club => this.adaptClubResponse(club)));
