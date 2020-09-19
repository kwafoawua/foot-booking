const tournamentUtils = require('../utils/TournamentUtils');

exports.apply = async (tournaments) => {
    let response = [];
    for (let t of tournaments) {
        const doc = t._doc;
        const tmp = [{tournament: doc, inscriptionNumber: await tournamentUtils.getNumberOfInscriptions(t._doc._id)}];
        response = response.concat(tmp);
    }
    return response;
}
