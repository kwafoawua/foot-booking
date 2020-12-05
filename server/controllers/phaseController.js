const mongoose = require('mongoose');
const Phase = require('../models/Phase');
const {shuffleTeamsArray} = require("../common/phaseLogic");
const {getAllTeamsRegistered} = require("../common/inscriptionLogic");
const {roundOfSixteen} = require("../models/const/RoundOfSixteen");
const {quarterFinal} = require("../models/const/QuarterFinal");
const {semiFinal} = require("../models/const/SemiFinal");
const {final} = require("../models/const/Final");
const moment = require('moment');
const { getInscriptionEmails } = require('./inscriptionController');
const Tournament = require('../models/Tournament');
const { sendEmail } = require('./mailing');
const bookingService = require('../services/booking.service')

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
    const PENDING_GAME = "Pendiente de Juego";
    try {
        // TODO -> no ejecutarse si al menos un partido se jugo
        let teamsShuffle = shuffleTeamsArray(await getAllTeamsRegistered(req.params.tournamentId));
        let phases = await Phase.findOneAndUpdate({
                $and: [
                    {"tournamentId": mongoose.Types.ObjectId(req.params.tournamentId)},
                    {phaseType: "Octavos de final"}
                ]
            },
            {
                $set: {
                    'matches.0.localTeam.teamName': teamsShuffle[0]._doc.team.name,
                    'matches.0.visitorTeam.teamName': teamsShuffle[1]._doc.team.name,
                    'matches.0.state': PENDING_GAME,
                    'matches.1.localTeam.teamName': teamsShuffle[2]._doc.team.name,
                    'matches.1.visitorTeam.teamName': teamsShuffle[3]._doc.team.name,
                    'matches.1.state': PENDING_GAME,
                    'matches.2.localTeam.teamName': teamsShuffle[4]._doc.team.name,
                    'matches.2.visitorTeam.teamName': teamsShuffle[5]._doc.team.name,
                    'matches.2.state': PENDING_GAME,
                    'matches.3.localTeam.teamName': teamsShuffle[6]._doc.team.name,
                    'matches.3.visitorTeam.teamName': teamsShuffle[7]._doc.team.name,
                    'matches.3.state': PENDING_GAME,
                    'matches.4.localTeam.teamName': teamsShuffle[8]._doc.team.name,
                    'matches.4.visitorTeam.teamName': teamsShuffle[9]._doc.team.name,
                    'matches.4.state': PENDING_GAME,
                    'matches.5.localTeam.teamName': teamsShuffle[10]._doc.team.name,
                    'matches.5.visitorTeam.teamName': teamsShuffle[11]._doc.team.name,
                    'matches.5.state': PENDING_GAME,
                    'matches.6.localTeam.teamName': teamsShuffle[12]._doc.team.name,
                    'matches.6.visitorTeam.teamName': teamsShuffle[13]._doc.team.name,
                    'matches.6.state': PENDING_GAME,
                    'matches.7.localTeam.teamName': teamsShuffle[14]._doc.team.name,
                    'matches.7.visitorTeam.teamName': teamsShuffle[15]._doc.team.name,
                    'matches.7.state': PENDING_GAME,
                }
            }, {new: true});
        await sendShuffleEmails(req.params.tournamentId);
        await res.status(200).send({
            phases: {...phases._doc},
            msg: "Generación de sorteo para torneo de 16 realizada exitosamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("No se pudo sortear los partidos, ocurrio un error interno en randomMatchesLink");
    }
};

const sendShuffleEmails = async (tId) => {
    const emails = await getInscriptionEmails(tId);
    const tournament = await Tournament.findById(tId).select('tournamentName').exec();
    const subject = `El campeonato ${tournament.tournamentName} ya se sorteó. ¿Estás listo para jugar?`;
    const text = `
    Hola! ¿Están listos con tu equipo para comenzar a jugar?.
    El campeonato ${tournament.tournamentName} ya se sorteó y ya podes ir a visitar el sitio para saber contra quien jugas en www.footbooking.com.
    Mucha suerte para este campeonato! \n
    Saludos Footbooking!
    `;
    await sendEmail('', emails, subject, text);
};


exports.setResultOfAMatch = async (req, res) => {
    const {tournamentId, matchId, localGoals, visitorGoals} = req.body;
    try {
        await Phase.findOneAndUpdate({
            tournamentId: mongoose.Types.ObjectId(tournamentId),
            'matches._id': matchId
        }, {
            ...(localGoals && {'matches.$.localTeam.goals': localGoals}),
            ...(visitorGoals && {'matches.$.visitorTeam.goals': visitorGoals}),
            'matches.$.state': "Finalizado"
        }, {useFindAndModify: false});
        await res.json({msg: "Partido actualizado correctamente"})
    } catch (error) {
        res.status(500).send("Error al intentar actualizar el resultado de un partido", error);
    }
};

exports.updatePhaseMatch = async (req, res) => {
    const {
        tournamentId,
        matchId,
        localTeam,
        visitorTeam,
        localGoals,
        visitorGoals,
        hourDate,
        dateToPlay,
        field,
        bookingId,
        clubId,
      tournamentName,
    } = req.body;
    let state;
    const localState = typeof(localGoals) === "number" && localGoals >= 0;
    const visitorState =  typeof(visitorGoals) === "number" && visitorGoals >= 0;
    if(localState && visitorState) {
        state = 'Finalizado';
    }  else if(visitorTeam || localTeam) {
        state = "Pendiente de Juego";
    } else {
        state = 'Sin asignar';
    }
    try {
        const bookingMatch = await bookingService.registerBookingsForPhase(bookingId, clubId, localTeam, visitorTeam, dateToPlay, hourDate, field, tournamentName);
        await Phase.findOneAndUpdate({
                tournamentId: mongoose.Types.ObjectId(tournamentId),
                'matches._id': matchId
            },
            {
                ...(localTeam && {'matches.$.localTeam.teamName': localTeam}),
                ...(visitorTeam && {'matches.$.visitorTeam.teamName': visitorTeam}),
                ...(localGoals >= 0 && {'matches.$.localTeam.goals': localGoals}),
                ...(visitorGoals >= 0 && {'matches.$.visitorTeam.goals': visitorGoals}),
                ...(hourDate && {'matches.$.hourToPlay': hourDate}),
                ...(dateToPlay && {'matches.$.dateToPlay': dateToPlay}),
                ...(field && {'matches.$.fieldName': field.fieldName}),
                ...(field && {'matches.$.fieldId': field._id}),
                ...(bookingMatch && {'matches.$.bookingId': bookingMatch._id}),
                'matches.$.state': state
            }, {useFindAndModify: false});
        await res.json({msg: "Partido actualizado correctamente"})
    } catch (error) {
        res.status(500).send("Error al intentar actualizar una fase", error);
    }
};

exports.updatePhase = async (req, res) => {
    try {
        await Phase.findOneAndUpdate({
            _id: req.body.phaseId
        }, {
            $set: {'dateToPlay': req.body.dateToPlay}
        },  {useFindAndModify: false})
        await res.json({msg: "Fase actualizada correctamente"})
    } catch (error) {
        res.status(500).send("Ocurrio un error en la actualizacion de la fase: " + error);
    }
}
