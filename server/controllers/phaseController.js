const mongoose = require('mongoose');
const Phase = require('../models/Phase');
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

exports.setResultOfAMatch = async (req, res) => {
    const {tournamentId, matchId, localgoals, visitorgoals} = req.body;
    try {
        await Phase.findOneAndUpdate(
            {
                $and: [
                    {_id: mongoose.Types.ObjectId(tournamentId)},
                    {matchId: matchId}
                ]
            },
            {
                $set: [
                    {'localTeam.goals': localgoals},
                    {'visitorTeam.goals': visitorgoals}
                ]
            });
        await res.json({msg: "Partido actualizado correctamente"})
    } catch (error) {
        res.status(500).send("Error al intentar actualizar el resultado de un partido", error);
    }
};

exports.updateAPhase = async (req, res) => {
    const {tournamentId, matchId} = req.body;
    try {
        await Phase.findOneAndUpdate(
            {
                $and: [
                    {_id: mongoose.Types.ObjectId(tournamentId)},
                    {matchId: matchId}
                ]
            },
            {$set: req.body}
        );
    } catch (error) {
        res.status(500).send("Error al intentar actualizar una fase", error);
    }
};


// TODO: update multiple phases
