const mongoose = require('mongoose');
const Booking = require("../models/Booking");
const phaseService = require('../services/phase.service');

exports.registerBookingsForPhase = async (bookingId, clubId, dateToPlay, hourDate, rawField, tournamentName, tournamentId, bookingState, matchId, localTeam, visitorTeam) => {
    const phaseType = await phaseService.getPhaseTypeNameForMatchId(tournamentId, matchId);

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
            name: `${tournamentName} - ${phaseType}` || `Campeonato - ${phaseType}`,
            lastName: bookingMatchName(localTeam, visitorTeam)
        },
        paymentStatus: 'Pago Total'
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    return Booking.findOneAndUpdate(query, update, options);
}

exports.updateInicialBookingsForPhase = async matches => {
    let nameToShow;
    let status = 'Reservado';
    for (const match of matches) {
        if (match._doc.localTeam.teamName && match._doc.visitorTeam.teamName) {
            nameToShow = bookingMatchName(match._doc.localTeam.teamName, match._doc.visitorTeam.teamName);
        } else {
            nameToShow = `${match._doc.localTeam.teamName || match._doc.visitorTeam.teamName} - Sin Adversario`;
            status = 'Finalizado';
        }
        await Booking.findOneAndUpdate(
            {
                _id: match._doc.bookingId,
                isTournamentBooking: true
            },
            {
                $set: {
                    'player.lastName': nameToShow,
                    'status': status
                }
            }
        );
    }
}

exports.bookingMatchName = (localName, visitorName) => {
    const DEFAULT_BOOKING_NAME = 'Esperando definición';
    const local = localName || DEFAULT_BOOKING_NAME;
    const visitor = visitorName || DEFAULT_BOOKING_NAME;

    if (local !== DEFAULT_BOOKING_NAME || visitor !== DEFAULT_BOOKING_NAME) {
        return `${local} - ${visitor}`;
    } else {
        return DEFAULT_BOOKING_NAME;
    }
}

exports.cancelTournamentBookings = tournamentId => {
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
    Booking.updateMany(query, {status: 'Cancelado'})
}

exports.fieldHasExistenceBooking = async fieldId => await Booking.findOne({
    'field.id': fieldId,
    status: 'Reservado',
    playingDate: {$gte: new Date().setHours(0, 0, 0, 0)}
});


