const mongoose = require('mongoose');
const Phase = require('../models/Phase');
const {shuffleTeamsArray} = require("../common/phaseLogic");
const {getAllTeamsRegistered} = require("../common/inscriptionLogic");
const {roundOfSixteen} = require("../models/const/RoundOfSixteen");
const {quarterFinal} = require("../models/const/QuarterFinal");
const {semiFinal} = require("../models/const/SemiFinal");
const {final} = require("../models/const/Final");

/**
 *  Phases creation. This functions creates all the different phases for a Tournament. The phases should be created
 *  with the Tournament creation.
 */
exports.createPhases = async tournamentId => {
    await new Phase({tournamentId: tournamentId, ...roundOfSixteen}).save();
    await new Phase({tournamentId: tournamentId, ...quarterFinal}).save();
    await new Phase({tournamentId: tournamentId, ...semiFinal}).save();
    await new Phase({tournamentId: tournamentId, phaseType: 'Tercero y Cuarto puesto', ...final}).save();
    await new Phase({tournamentId: tournamentId, phaseType: 'Final', ...final}).save();
}

exports.getParticularPhaseByTournamentId = async (req, res) => {
    const {tournamentId, phaseNumber} = req.headers;
    try {
        let phases = await Phase.find({
            $and: [
                {tournamentId: mongoose.Types.ObjectId(tournamentId)},
                {'phaseType.number': phaseNumber}
            ]
        })
        await res.json({phases});
    } catch (error) {
        res.status(500).send("Ocurrio un error en la obtencion de la fase" + phaseNumber + " fases del torneo" + tournamentId);
    }
};

exports.getAllPhasesOfTournament = async (req, res) => {
    try {
        let phases = await Phase.find({
            tournamentId: mongoose.Types.ObjectId(req.params.tournamentId)
        })
        await res.json({phases});
    } catch (error) {
        res.status(500).send("Ocurrio un error imprevisto en la obtencion de fases del torneo" + res.params.tournamentId);
    }
};

/**
 * Generates all matches to play
 */
exports.randomMatchesLink = async (req, res) => {
    try {
        // TODO -> no ejecutarse si al menos un partido se jugo
        let teamsShuffle = shuffleTeamsArray(await getAllTeamsRegistered(req.params.tournamentId));
        await Phase.update({
                $and: [
                    {_id: mongoose.Types.ObjectId('5f669b16fe33b711fc8d74f5')},
                    // en caso de que el front pueda soportar el id de la fase
                    // {"tournamentId": mongoose.Types.ObjectId("5f669b16fe33b711fc8d74f4")}
                    {phaseType: "Octavos de final"}
                ]
            },
            {
                $set: {
                    'matches.0.localTeam.teamName': teamsShuffle[0]._doc.team.name,
                    'matches.0.visitorTeam.teamName': teamsShuffle[1]._doc.team.name,
                    'matches.0.state': "Pendiente de Juego",
                    'matches.1.localTeam.teamName': teamsShuffle[2]._doc.team.name,
                    'matches.1.visitorTeam.teamName': teamsShuffle[3]._doc.team.name,
                    'matches.1.state': "Pendiente de Juego",
                    'matches.2.localTeam.teamName': teamsShuffle[4]._doc.team.name,
                    'matches.2.visitorTeam.teamName': teamsShuffle[5]._doc.team.name,
                    'matches.2.state': "Pendiente de Juego",
                    'matches.3.localTeam.teamName': teamsShuffle[6]._doc.team.name,
                    'matches.3.visitorTeam.teamName': teamsShuffle[7]._doc.team.name,
                    'matches.3.state': "Pendiente de Juego",
                    'matches.4.localTeam.teamName': teamsShuffle[8]._doc.team.name,
                    'matches.4.visitorTeam.teamName': teamsShuffle[9]._doc.team.name,
                    'matches.4.state': "Pendiente de Juego",
                    'matches.5.localTeam.teamName': teamsShuffle[10]._doc.team.name,
                    'matches.5.visitorTeam.teamName': teamsShuffle[11]._doc.team.name,
                    'matches.5.state': "Pendiente de Juego",
                    'matches.6.localTeam.teamName': teamsShuffle[12]._doc.team.name,
                    'matches.6.visitorTeam.teamName': teamsShuffle[13]._doc.team.name,
                    'matches.6.state': "Pendiente de Juego",
                    'matches.7.localTeam.teamName': teamsShuffle[14]._doc.team.name,
                    'matches.7.visitorTeam.teamName': teamsShuffle[15]._doc.team.name,
                    'matches.7.state': "Pendiente de Juego",
                }
            });
        await res.json("Generación de sorteo para torneo de 16 realizada exitosamente");
    } catch (error) {
        res.status(500).send("No se pudo sortear los partidos, ocurrio un error interno en randomMatchesLink");
    }
}

exports.setResultOfAMatch = async (req, res) => {
    const {tournamentId, matchId, localgoals: localGoals, visitorgoals: visitorGoals} = req.body;
    //TODO -> si goal es undefined hacerlo 0
    try {
        await Phase.findOneAndUpdate({
            tournamentId: mongoose.Types.ObjectId(tournamentId),
            'matches.matchId': matchId
        }, {
            ...(localGoals && {'matches.$.localTeam.goals': localGoals}),
            ...(visitorGoals && {'matches.$.visitorTeam.goals': visitorGoals}),
            'matches.$.state': "Finalizado"
        });
        await res.json({msg: "Partido actualizado correctamente"})
    } catch (error) {
        res.status(500).send("Error al intentar actualizar el resultado de un partido", error);
    }
};

exports.updatePhaseTeams = async (req, res) => {
    const {tournamentId, matchId, localteam: localTeam, visitorteam: visitorTeam} = req.body;
    try {
        await Phase.findOneAndUpdate({
                tournamentId: mongoose.Types.ObjectId(tournamentId),
                'matches.matchId': matchId
            },
            {
                ...(localTeam && {'matches.$.localTeam.teamName': localTeam}),
                ...(visitorTeam && {'matches.$.visitorTeam.teamName': visitorTeam}),
                'matches.$.state': "Pendiente de Juego"
            }
        );
        await res.json({msg: "Partido actualizado correctamente"})
    } catch (error) {
        res.status(500).send("Error al intentar actualizar una fase", error);
    }
};
