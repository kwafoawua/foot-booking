const mongoose = require('mongoose');

const PhaseSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        requiered: true
    },
    dateToPlay: Date,
    phaseType: {
        type: String,
        requiered: true,
        trim: true,
        enum: ['Octavos de final', 'Cuartos de final', 'Semifinal', 'Final', 'Tercero y Cuarto puesto']
    },
    matches: [{
        matchId: String,
        localTeam: {
            teamName: String,
            goals: Number
        },
        visitorTeam: {
            teamName: String,
            goals: Number
        },
        hourToPlay: String,
        state: {
            type: String,
            default: 'Sin asignar',
            enum: ['Sin asignar', 'Pendiente de Juego', 'Finalizado', 'Suspendido']
        },
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            requiered: false
        }
    }]
});

module.exports = mongoose.model('Phase', PhaseSchema);
