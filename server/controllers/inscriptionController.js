const TournamentInscription = require('../models/TournamentInscription');
const Tournament = require('../models/Tournament');
const mongoose = require('mongoose');
const Player = require('../models/Player');
const {sendEmail} = require('./mailing');
const moment = require('moment');
const mercadoPagoController = require('./MercadoPagoController');
const tournamentController = require("./tournamentController");
const {getPagination} = require('../utils/utils');


/**
 * Create inscription
 */
exports.newTournamentInscription = async (req, res) => {
    const {idTournament, idUser, name, team, phoneNumber} = req.body;
    const externalReference = `${Date.now()}-${idTournament}`;
    let inscription = new TournamentInscription({
        tournamentId: idTournament,
        userId: idUser,
        referringContact: {name: name, phoneNumber: phoneNumber},
        team: {name: team},
        paymentReference: externalReference,
    });

    try {
        // TODO -> validar que queden lugares para inscripcion
        // TODO -> validar que no exista equipo con ese nombre
        // TODO -> validar que no se inscriba jugador 2 veces
        let tournamentInfo = await tournamentController.getTournamentById(idTournament);
        await inscription.save();
        const checkout = await mercadoPagoController.generatePreferenceForInscription(tournamentInfo, externalReference);
        await res.status(200).send({initPoint: checkout.init_point});
    } catch (e) {
        res.status(500).send("Ocurrió un error imprevisto :(");
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
            tournamentId: mongoose.Types.ObjectId(req.params.tournamentId),
            paymentStatus: 'Pagado'
        });
        await res.json({inscriptions});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
};

exports.getPlayerInscriptions = async (req, res) => {
    try {
        const {page, size} = req.query;
        const {limit, offset} = getPagination(page, size);
        let inscriptions = await TournamentInscription.paginate({
            userId: mongoose.Types.ObjectId(req.params.playerId),
            paymentStatus: 'Pagado'
        }, {
            limit,
            offset,
            sort: {_id: -1},
            populate: {
                path: 'tournamentId',
                populate: {
                    path: 'creatorClubId'
                }
            }
        });
        res.status(200).send({
            totalItems: inscriptions.totalDocs,
            inscriptions: inscriptions.docs,
            totalPages: inscriptions.totalPages,
            currentPage: inscriptions.page - 1,
        });
    } catch (e) {
        console.log(e);
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

module.exports.getInscriptionEmails = async (id) => {
    let inscriptions = await TournamentInscription.find({
        tournamentId: mongoose.Types.ObjectId(id),
        paymentStatus: 'Pagado'
    })
        .populate({path: 'userId', select: 'email'});

    return inscriptions
        .map(inscription => inscription.userId && inscription.userId.email)
        .filter(email => email);
};

/**
 * Update tournament inscription as payed when mercadopago confirm payment.
 * If payment is reject then delete that temporal booking.
 */
exports.updateInscriptionByExternalReference = async (paymentReference, isPaid) => {
    if (isPaid) {
        await TournamentInscription.findOneAndUpdate(
            {paymentReference: paymentReference},
            {$set: {paymentStatus: 'Pagado'}},
            {new: true}
        );
        await sendInscriptionMailSuccess(paymentReference);
    } else {
        await TournamentInscription.findOneAndDelete(
            {paymentReference: paymentReference}
        );
    }
}

sendInscriptionMailSuccess = async paymentReference => {
    const inscription = await TournamentInscription.find({paymentReference: paymentReference});
    const player = await Player.findById(inscription.userId).exec();
    const tournament = await Tournament.findById(inscription.tournamentId).exec();
    const subject = `Te inscribiste al campeonato ${tournament.tournamentName}`;
    const text = `
        Hola ${player.name}! Muchas gracias por inscribirte al campeonato ${tournament.tournamentName}.
        El mismo va a iniciar el día ${moment(tournament.startDate).format('D/M/YY')}.
        Cuando el club realice el sorteo de los equipos que participan te notificaremos por este medio. Estate atento con tu equipo para saber que día y horario tienen el partido!
        Podrás encontrar más información en la sección de "Campeonatos" disponible en el menú "Preferencias". \n
        Saludos Footbooking!
        `;
    await sendEmail(player.name, player.email, subject, text);
}
