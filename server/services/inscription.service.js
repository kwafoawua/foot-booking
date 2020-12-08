const TournamentInscription = require('../models/TournamentInscription');
const Player = require('../models/Player');
const Tournament = require('../models/Tournament');
const moment = require('moment');
const {sendEmail} = require('../controllers/mailing');

exports.sendInscriptionMailSuccess = async paymentReference => {
    const inscription = await TournamentInscription.findOne({paymentReference: paymentReference});
    const player = await Player.findById(inscription.userId).exec();
    const tournament = await Tournament.findById(inscription._doc.tournamentId).exec();
    const subject = `Te inscribiste al campeonato ${tournament._doc.tournamentName}`;
    const text = `
        Hola ${player._doc.name}! Muchas gracias por inscribirte al campeonato ${tournament._doc.tournamentName}.
        El mismo va a iniciar el día ${moment(tournament._doc.startDate).format('D/M/YY')}.
        Cuando el club realice el sorteo de los equipos que participan te notificaremos por este medio. Estate atento con tu equipo para saber que día y horario tienen el partido!
        Podrás encontrar más información en la sección de "Campeonatos" disponible en el menú "Preferencias". \n
        Saludos Footbooking!
        `;
    await sendEmail(player._doc.name, player._doc.email, subject, text);
}
