const TournamentInscription = require('../models/TournamentInscription');
const mongoose = require('mongoose');
let mercadoPagoController = require('./MercadoPagoController')
const {getTournamentById} = require("./tournamentController");

/**
 * Create inscription
 */
exports.newTournamentInscription = async (req, res) => {
    const {idTournament, idUser, name, team, phoneNumber} = req.body;
    const externalReference = `${Date.now()}-${idTournament}`;
    let inscription = new TournamentInscription({
        tournamentId: idTournament,
        userId: idUser,
        referringContact: {
            name: name,
            phoneNumber: phoneNumber
        },
        team: {
            name: team
        },
        paymentReference: externalReference,
    })

    try {
        // TODO -> validar que queden lugares para inscripcion
        // TODO -> validar que no exista equipo con ese nombre
        // TODO -> validar que no se inscriba jugador 2 veces
        let tournamentInfo = await getTournamentById(idTournament);
        await inscription.save();
        const checkout = await mercadoPagoController.generatePreferenceForInscription(tournamentInfo, externalReference);
        res.status(200).send({initPoint: checkout.init_point});
        // await res.json({initPoint: checkout.init_point});
        // res.status(200).send({inscription: inscription, success: 'Inscipcion exitosa.'});
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
        await res.json({inscription});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
};

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
};

exports.getPlayerInscriptions = async (req, res) => {
    try {
        let inscriptions = await TournamentInscription.find({
            userId: mongoose.Types.ObjectId(req.params.playerId)
        });
        await res.json({inscriptions});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
}

/**
 * Utility - checks:
 *      - with quota for inscription?
 *      - inscriptions are close?
 * @return true if can effectuate the inscription
 */
canEffectuateInscription = async (tournamentId) => {
    try {
        //verify quota
        let actualInscriptions = await TournamentInscription.countDocuments({tournamentId: tournamentId})
        // let quota =
    } catch (error) {
        return false;
    }
};

/**
 * Update tournament inscription as payed when mercadopago confirm payment.
 * If payment is reject then delete that temporal booking.
 */
exports.updateInscriptionByExternalReference = async (paymentReference, isPaid) => {
    isPaid ?
        await TournamentInscription.findOneAndUpdate(
            {paymentReference: paymentReference},
            {$set:{paymentStatus: 'Pagado'}},
            {new: true}
        )
        :
        await TournamentInscription.findOneAndDelete(
            {paymentReference: paymentReference}
        );
}

// TODO: validations for endpoints
