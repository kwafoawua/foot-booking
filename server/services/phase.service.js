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


exports.getSettersPhase = (phases) => {

  const octavos = phases.find(phase => phase.phaseType === 'Octavos de final');

  const setCuartos = {};
  // const setOctavos = {};

  octavos.matches.forEach((match, index) => {
    const esPar = index % 2 === 0;
    const localName = match.localTeam.teamName;
    const visitorName = match.visitorTeam.teamName;
    const nextIndex = esPar ? index / 2 : Math.floor((index / 2));
    console.log(localName);
    if(localName && visitorName) {
      return;
    }

    if(esPar) {
      const matchString = `matches.${nextIndex}.localTeam.teamName`;
      setCuartos[matchString] = localName;
    } else {
      const matchString = `matches.${nextIndex}.visitorTeam.teamName`;
      setCuartos[matchString] = localName;
    }
    const cuartosState = `matches.${nextIndex}.state`
    setCuartos[cuartosState] = 'Pendiente de Juego';
    // const octavosState = `matches.${index}.state`;
    // setOctavos[octavosState] = 'Finalizado';

  });

  return { setCuartos };
};