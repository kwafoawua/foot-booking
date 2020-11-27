const TournamentInscription = require('../models/TournamentInscription');
const mongoose = require('mongoose');

exports.newTournamentInscription = async (req, res) => {
    try {
        const {idTournament, idUser, name, team, phoneNumber} = req.body;
        const externalReference = `${Date.now()}-${idTournament}`;
        let inscription = new TournamentInscription({
            tournamentId: idTournament,
            userId: idUser,
            referringContact: { name: name, phoneNumber: phoneNumber },
            team: { name: team },
            paymentReference: externalReference,
            paymentStatus: 'Pagado'
        });
        await inscription.save();
        await res.json({msg: "Inscipcion exitosa."});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
};
