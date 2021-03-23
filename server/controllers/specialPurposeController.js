require('mongoose');
const TournamentInscription = require('../models/TournamentInscription');
const Tournament = require('../models/Tournament')
const inscriptionLogic = require('../common/inscriptionLogic');

async function makeInscription(idTournament, idUser, name, phoneNumber, team) {
    const externalReference = `${Date.now()}-${idTournament}`;
    let inscription = new TournamentInscription({
        tournamentId: idTournament,
        userId: idUser,
        referringContact: {name: name, phoneNumber: phoneNumber},
        team: {name: team},
        paymentReference: externalReference,
        paymentStatus: 'Pagado'
    });
    await inscription.save();
}

async function completeTournament(idTournament) {
    await Tournament.findByIdAndUpdate(idTournament, {state: 'Completado'})
}

exports.newTournamentInscription = async (req, res) => {
    try {
        const {idTournament, idUser, name, team, phoneNumber} = req.body;

        const numberOfTeams = await inscriptionLogic.getAllTeamsRegistered(idTournament);
        if (numberOfTeams.length > 16) {
            res.status(500).send("Ya hay 16 inscriptos bro");
        } else if (numberOfTeams.length === 15) {
            await completeTournament(idTournament);
        }
        await makeInscription(idTournament, idUser, name, phoneNumber, team);
        res.json({msg: "Inscipcion exitosa."});
    } catch (e) {
        res.status(500).send("Ocurrio un error imprevisto :(");
    }
};
