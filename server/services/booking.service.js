exports.registerBookingsForPhase = () => {
    // creates bookings for phase or update existent
}

exports.cancelTournamentBookings = () => {
    // change match bookings status to 'Cancelado' if match has not result
    // or if match date is already pass
}

exports.sendTournamentCancellationEmailToTeams = () => {
    // iterates over current phase
    // get teams emails that has a tournament booking status 'Reservado' and match
    // team name with tournament inscription team name to get the userId
    // then gets email of player and send notification
}
