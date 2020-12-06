const Tournament = require("../models/Tournament");
const {sendEmail} = require("../controllers/mailing");
const {getInscriptionEmails} = require("../controllers/inscriptionController");

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
