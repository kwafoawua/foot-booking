const mongoose = require('mongoose');
const Tournament = require('../models/Tournament');
const {validationResult} = require("express-validator");
const tournamentUtils = require('../utils/TournamentUtils');
const tournamentAdapter = require('../adapters/TournamentResponseAdapter');

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
    // validar duplicados
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
        await res.json({msg: "Torneo creado exitosamente"});
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
        const tournament = await Tournament.findById(_id);
        const inscriptionNumber = await tournamentUtils.getNumberOfInscriptions(_id);
        await res.json({tournament, inscriptionNumber});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
};

/**
 * Find a Tournament by creator club id
 */
exports.getClubTournaments = async (req, res) => {
    try {
        const tournament = await Tournament.find({creatorClubId: mongoose.Types.ObjectId(req.params.clubId)});
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
    try {
        await Tournament.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(req.params._id)},
            {$set: req.body},
            {new: true});
        await res.json({msg: "Torneo modificado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error imprevisto :/");
    }
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
