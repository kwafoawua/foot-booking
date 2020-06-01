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

/*FILTERS*/
router.get('/findClub/:clubfilter', clubController.findClubsByFilter);
router.get('/findClubsByFilters/:clubfilter', clubController.findClubsByMultipleFilter);

/*Booking Controller*/
router.post('/bookings/register', bookingController.registerBooking);
router.put('/bookings/setStatus/', bookingController.updateBookingStatus);
router.get('/bookings/:_id', bookingController.findAllByReferenceId);
router.get('/bookings/getHoursToPlay', bookingController.findAllHoursBookings);
router.get('/bookings/horarios/:bookingfilter', bookingController.findAllBookingsByFieldAndDay);

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
router.get('/tournament/club/:clubid', tournamentController.getClubTournaments);
router.get('/tournaments', tournamentController.getAllTournaments);

module.exports = router;
