const TournamentInscription = require('../models/TournamentInscription');
const mongoose = require('mongoose');

/**
 * Create inscription
 */
exports.newTournamentInscription = async (req, res) => {
    try {
        let inscription = new TournamentInscription(req.body);
        await inscription.save();
        await res.json({msg: "Inscipcion exitosa."});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
};

/**
 * Find a inscription by id
 */
exports.getInscription = async (req, res) => {
    try {
        let inscription = await TournamentInscription.findById(req.params._id);
        await res.json({inscription})
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
}

/**
 * Find all inscription of a tournament
 */
exports.getTournamentInscriptions = async (req, res) => {
    try {
        let inscriptions = await TournamentInscription.find({
            tournamentId: mongoose.Types.ObjectId(req.params.tournamentId)
        });
        await res.json({inscriptions});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
}

// TODO: validations for endpoints
