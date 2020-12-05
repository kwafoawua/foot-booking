const mongoose = require('mongoose');
const Booking = require("../models/Booking");
const Club = require("../models/Club");

exports.registerBookingsForPhase = async (bookingId, clubId, localTeam, visitorTeam, dateToPlay, hourDate, rawField, tournamentName) => {

    if(!dateToPlay && !hourDate && !rawField) {
        return;
    }

    const _id = bookingId || new mongoose.mongo.ObjectID();
    const {_id: fieldId, ...field } = rawField;
    field.id = fieldId;
    let query = {
        isTournamentBooking: true,
        _id: _id
    }
    let update = {
        isTournamentBooking: true,
        club: {id: clubId},
        field: field,
        playingDate: dateToPlay,
        playingTime: hourDate,
        status: 'Reservado',
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

exports.cancelTournamentBookings = async (req, res) => {
    // change match bookings status to 'Cancelado' if match has not result
    // or if match date is already pass
    const club = await Club.find().where('fields._id').in(req.params._id).exec();
    return res.status(200).send(club)
}

exports.sendTournamentCancellationEmailToTeams = () => {
    // iterates over current phase
    // get teams emails that has a tournament booking status 'Reservado' and match
    // team name with tournament inscription team name to get the userId
    // then gets email of player and send notification
}
