const mongoose = require('mongoose');

const InscriptionSchema = new mongoose.Schema({
    tournamentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', requiered: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', requiered: true},
    referringContact: {
        name: {type: String, maxLength: 35},
        phoneNumber: Number
    },
    amountPaid: Number,
    team: {
        name: {type: String, maxLength: 35, trim: true},
        logo: {type: String},
        players: [{
            name: {type: String, maxLength: 35},
            birthDate: {type: Date, trim: true},
        }]
    },
    inscriptionDate: {type: Date, default: Date.now},
    paymentReference: String,
    paymentStatus: {
        type: String,
        default: 'Procesando',
        enum: ['Procesando', 'Pagado']
    }
})

module.exports = mongoose.model('TournamentInscription', InscriptionSchema)
