const mongoose = require('mongoose');
const Booking = require("../models/Booking");
const Tournament = require("../models/Tournament");
const {sendEmail} = require("../controllers/mailing");
const {getInscriptionEmails} = require("../controllers/inscriptionController");

exports.registerBookingsForPhase = async (bookingId, clubId, localTeam, visitorTeam, dateToPlay, hourDate, rawField, tournamentName, tournamentId, bookingState) => {
    const _id = bookingId || new mongoose.mongo.ObjectID();
    const {_id: fieldId, ...field} = rawField;
    field.id = fieldId;
    let query = {
        isTournamentBooking: true,
        _id: _id
    }
    let update = {
        isTournamentBooking: true,
        tournamentId: tournamentId,
        club: {id: clubId},
        field: field,
        playingDate: dateToPlay,
        playingTime: hourDate,
        status: bookingState,
        paidMethod: 'Torneo',
        player: {
            name: tournamentName || 'Campeonato',
            lastName: `${localTeam} - ${visitorTeam}`
        },
        paymentStatus: 'Pago Total'
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    return Booking.findOneAndUpdate(query, update, options);
}

exports.cancelTournamentBookings = async tournamentId => {
    const hoursArray = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
    const arrayHourOffset = 9;
    const currentHour = new Date().getHours();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (currentHour >= 10) {
        const spliceAmount = currentHour - arrayHourOffset;
        hoursArray.splice(0, spliceAmount);
    }

    const query = {
        tournamentId: tournamentId,
        status: 'Reservado',
        $or: [
            {
                $and: [
                    {playingDate: {$eq: today}},
                    {playingTime: {$in: hoursArray}}
                ]
            },
            {playingDate: {$gt: today}}
        ]
    }
    await Booking.updateMany(query, {status: 'Cancelado'})
}

exports.sendTournamentCancellationEmailToTeams = async tournamentId => {
    const emails = await getInscriptionEmails(tournamentId);
    const tournament = await Tournament.findById(tournamentId).populate('creatorClubId').select('tournamentName creatorClubId termsAndConditions').exec();
    const subject = `Cancelación del campeonato ${tournament.tournamentName}.`;
    const text = `
    Hola, lamentamos informales que el campeonato "${tournament.tournamentName}" ha sido cancelado.
    Los términos y condiciones del campeonato eran: \n
    "${tournament.termsAndConditions}" \n
    Te recomendamos que te contactes con el club ${tournament.creatorClubId.name} (telefono: ${tournament.creatorClubId.phoneNumber}) para conocer el motivo de cancelación y resolver cualquier otra consulta. \n \n
    Saludos Footbooking.
    `;
    await sendEmail('', emails, subject, text);
}
