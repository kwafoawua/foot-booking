const tournamentUtils = require('../utils/TournamentUtils');

exports.apply = async (tournaments) => {
    var response = [];
    for (let t of tournaments) {
        var doc = t._doc;
        var tmp = [{tournament: doc, inscNumb: await tournamentUtils.getNumberOfInscriptions(t._doc._id)}];
        response = response.concat(tmp);
    }
    return response;
}
