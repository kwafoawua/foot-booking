const Club = require('../models/Club')

const fieldCapacityMap = new Map([
    ['5 Jugadores', 5],
    ['7 Jugadores', 7],
    ['11 Jugadores', 11]
]);

exports.getClubFieldsForTournament = async (clubId, fieldCapacity) => {
    const club = await Club.findById(clubId);
    return club
        ? club.fields.filter(field => field.cantPlayers === fieldCapacityMap.get(fieldCapacity))
        : [];
};
