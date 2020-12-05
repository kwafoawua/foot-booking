const {sendEmail} = require('./mailing');
const mongoose = require('mongoose');
const Tournament = require('../models/Tournament');
const {validationResult} = require("express-validator");
const tournamentUtils = require('../utils/TournamentUtils');
const tournamentAdapter = require('../adapters/TournamentResponseAdapter');
const phasesCreator = require('./phaseController');
const clubService = require('../services/club.service');
const bookingService = require('../services/booking.service');

/**
 * Create a Tournament
 * TODO: Extraer validaciones, validar que club organizador exista. En validacion de duplicados comprobar el estado del torneo
 */
exports.createTournament = async (req, res) => {
    // revisar errores de request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {creatorClubId, tournamentName} = req.body;
    try {
        let tournament = await Tournament.findOne({
            $and: [
                {creatorClubId: creatorClubId},
                {tournamentName: tournamentName}
            ]
        });
        if (tournament) {
            return res.status(400).json({msg: "Ya existe un campeonato con ese nombre"});
        }
        tournament = new Tournament(req.body);
        await tournament.save();
        await phasesCreator.createPhases(tournament._id);
        res.status(200).send({tournament: {...tournament._doc}, msg: 'Torneo creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
};

/**
 * Find a Tournament by tournament id
 */
exports.getTournament = async (req, res) => {
    try {
        const {_id} = req.params;
        const tournament = await this.getTournamentById(_id);
        const inscriptionNumber = await tournamentUtils.getNumberOfInscriptions(_id);
        const clubFields = await clubService.getClubFieldsForTournament(tournament.creatorClubId, tournament.numberOfPlayers);
        await res.json({tournament, inscriptionNumber, availableFieldsForBookingTournament: clubFields});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
};

exports.getTournamentById = async id => await Tournament.findById(id);

/**
 * Find a Tournament by creator club id
 */
exports.getClubTournaments = async (req, res) => {
    try {
        const tournament = await Tournament.find({creatorClubId: mongoose.Types.ObjectId(req.params.clubId)}).sort({'_id': -1});
        await res.json({tournament});
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
}

/**
 * Find all Tournament
 */
exports.getAllTournaments = async (req, res) => {
    try {
        const rawTournament = await Tournament.find();
        const tournaments = await tournamentAdapter.apply(rawTournament)
        await res.json({tournaments});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
};

/**
 * Edit a Tournament
 */
exports.updateTournament = async (req, res) => {
    const tournamentId = req.params._id;
    try {
        await Tournament.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(tournamentId)},
            {$set: req.body},
            {new: true}
            );
        await bookingService.cancelTournamentBookings(tournamentId)
        if(req.body.state === 'Completo') {
            console.log(req.body.state);
            await sendCompletedEmail(tournamentId)
        } else if (req.body.state === 'Cancelado') {
            // await bookingService.sendTournamentCancellationEmailToTeams();
        }
        await res.json({msg: "Torneo modificado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
};

const sendCompletedEmail = async (tId) => {
    const tournament = await Tournament.findById(tId).populate('creatorClubId').exec();
    console.log(tournament);
    const clubName = tournament.creatorClubId.name;
    const email = tournament.creatorClubId.email;
    const subject = `Se completaron las inscripciones del campeonato ${tournament.tournamentName}`;
    const text = `
    Hola ${clubName}! Se completaron las inscripciones del torneo y ya está listo para sortear los equipos.
     Te esperamos en www.footbooking.com para que comiences el campeonato!\n
    Saludos Footbooking!
    `;
    await sendEmail('', email, subject, text);
};

/**
 * Delete a Tournament
 */
exports.deleteTournamente = async (req, res) => {
    try {
        let tournament = await Tournament.findOne({_id: mongoose.Types.ObjectId(req.params._id)});
        await Tournament.delete(tournament);
        await res.json({msg: "Torneo eliminado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
}

/**
 * Find by multiple and variable filters
 */
exports.filterTournament = async (req, res) => {
    try {
        let {numbersofteams, inscriptioncost, numberofplayers, state, category} = req.headers;
        let queryCondition = {
            ...(numbersofteams && {numbersOfTeams: numbersofteams}),
            ...(inscriptioncost && {inscriptionCost: inscriptioncost}),
            ...(numberofplayers && {numberOfPlayers: numberofplayers}),
            ...(state && {state}),
            ...(category && {category})
        };
        const tournament = await Tournament.find(queryCondition);
        await res.json({tournament});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
}
