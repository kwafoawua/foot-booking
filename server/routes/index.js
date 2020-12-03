/**
 file where the routes are defined
 */
const express = require('express');
const router = express.Router();
const {check} = require("express-validator");

let clubController = require('../controllers/ClubController.js');
let userController = require('../controllers/userController.js');
let userController2 = require('../controllers/users.controller.js');
let uploadsManager = require('../controllers/uploads');
let playerController = require('../controllers/playerController');
let bookingController = require('../controllers/BookingController');
let commentController = require('../controllers/CommentController');
let tournamentController = require('../controllers/tournamentController');
let fieldController = require('../controllers/FieldController');
let inscriptionController = require('../controllers/inscriptionController');
let phaseController = require('../controllers/phaseController');
let mercadoPagoController = require('../controllers/MercadoPagoController')

//*User Controller*//
router.post('/users/authenticate', userController.authenticate);
router.get('/users/', userController2.getAll);
router.delete('/users/:_id', userController2._delete);
//router.get('/users/current', userController2.getCurrent);
router.get('/users/:username', userController.getByUsername);
router.put('/users/setemail', userController.setEmail);
router.put('/users/setPassword', userController.setPassword);

/*Player Controller*/
router.post('/players/register', playerController.registerPlayer);
router.get('/players/:_id', playerController.findById);
router.get('/players:_id', playerController.getPlayerByUserId);
router.put('/players/:_id', playerController.updatePlayer);


/*Club Controller*/
router.post('/clubs/register', uploadsManager.upload.fields([
    {name: 'profile', maxCount: 1},
    {name: 'gallery', maxCount: 5}
]), clubController.registerClub);
router.get('/clubs/:_id', clubController.findById);
router.get('/clubs/results/:_id', clubController.findById);

router.get('/clubs/', clubController.findAllClubs);
router.put('/clubs/:_id', uploadsManager.upload.fields([
    {name: 'profile', maxCount: 1},
    {name: 'gallery', maxCount: 5}
]), clubController.updateClub);
router.put('/clubs/fields/:_id', fieldController.updateFields);
router.get('/destacados/', clubController.getDestacados);
router.get('/club/fieldsCapacities/:_id', clubController.getFieldsCapacities);

/*FILTERS*/
router.get('/findClub/:clubfilter', clubController.findClubsByFilter);
router.get('/findClubsByFilters/:clubfilter', clubController.findClubsByMultipleFilter);

/*Booking Controller*/
router.post('/bookings/register', bookingController.registerBooking);
router.put('/bookings/setStatus/', bookingController.updateBookingStatus);
router.get('/bookings/:_id', bookingController.findAllByReferenceId);
router.get('/bookings/getHoursToPlay', bookingController.findAllHoursBookings);
router.get('/bookings/horarios/:bookingfilter', bookingController.findAllBookingsByFieldAndDay);
router.get('/bookings/player/:_id', bookingController.findPlayerBookings);

/* Comment Controller */
router.post('/comments/create', commentController.createComment);
router.put('/comments/changeComment/:_id', commentController.updateComment);
router.get('/comments/clubComment/:_id', commentController.findAllCommentForAClub);
router.get('/comments/authorComment/:_id', commentController.findAllAuthorComments);
router.delete('/comments/:_id', commentController.deleteComment);

/* Tournament Controller */
router.post('/tournament/register', [
    check('creatorClubId', 'Llego el campo del id del club organizador vacio es obligatorio').not().isEmpty(),
    check('tournamentName', 'Llego el campo del torneo vacio y es obligatorio').not().isEmpty()
], tournamentController.createTournament);
router.get('/tournament/:_id', tournamentController.getTournament);
router.get('/tournament/club/:clubId', tournamentController.getClubTournaments);
router.get('/tournaments', tournamentController.getAllTournaments);
router.put('/tournament/:_id', tournamentController.updateTournament);
router.delete('/tournament/:_id', tournamentController.deleteTournamente);
router.get('/filterTournaments', tournamentController.filterTournament);

/* Inscription to Tournament Controller */
router.post('/inscription/enroll', inscriptionController.newTournamentInscription);
router.get('/inscription/:_id', inscriptionController.getInscription);
router.get('/inscription/tournament/:tournamentId', inscriptionController.getTournamentInscriptions);
router.get('/inscription/player/:playerId', inscriptionController.getPlayerInscriptions);

/* Phases routes */
router.get('/phase/tournaments/:tournamentId', phaseController.getAllPhasesOfTournament);
router.put('/phase/updatePhase', phaseController.updatePhase);
router.get('/phase/shuffleMatches/:tournamentId', phaseController.randomMatchesLink);
router.put('/phase/updateMatch', phaseController.setResultOfAMatch);
router.put('/phase/updatePhaseMatch', phaseController.updatePhaseMatch);

/* MercadoPago */
router.post("/mercadopago/generatePreference", mercadoPagoController.generatePreference);
router.get("/mercadopago/linkMPAccount/:id", mercadoPagoController.linkAccountUrlRedirection);
router.get("/mercadopago/webhook/linkAccount", mercadoPagoController.linkAccount);
router.get("/mercadopago/hasLinkedAccount/:id", clubController.hasMercadoPagoToken);
router.post("/mercadopago/preference/tournamentInscription", mercadoPagoController.generatePreference);
router.post("/webhook/tournamentInscription", mercadoPagoController.inscriptionPaymentWebhook);

/* MercadoPago prueba de imple */
const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());
router.post("/payment/new", (req, res) => PaymentInstance.getMercadoPagoLink(req, res));
router.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

/* Endpoints temporales: sólo para facilitar el armado de datos para las demos */
const specialPurposeController = require("../controllers/specialPurposeController");
router.post("/tempRoute/inscription/enroll", specialPurposeController.newTournamentInscription)

const clubservice = require("../services/club.service")
const book = require("../services/booking.service")
// router.get("/fastTest/:clubId", clubservice.getClubFieldsForTournament);
router.get("/fastTest/:clubId", book.cancelTournamentBookings);

module.exports = router;
