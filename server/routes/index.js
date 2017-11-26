/**
file where the routes are defined
*/
var express = require('express');
var router = express.Router();

var clubController = require('../controllers/ClubController.js');
var userController = require('../controllers/userController.js');
var userController2 = require('../controllers/users.controller.js');
var uploadsManager = require('../controllers/uploads');
var playerController = require('../controllers/playerController');
var bookingController = require('../controllers/BookingController');
var commentController = require('../controllers/CommentController');
var tournamentController = require('../controllers/TournamentController');

//*User Controller*//
router.post('/users/authenticate', userController.authenticate);
router.get('/users/', userController2.getAll);
router.put('/users/:_id', userController2.update);
router.delete('/users/:_id', userController2._delete);
//router.get('/users/current', userController2.getCurrent);
router.get('/users/:username', userController.getByUsername);


/*Player Controller*/
router.post('/players/register', playerController.registerPlayer);
router.get('/players/:_id', playerController.findById);
//router.get('/players/:_id', playerController.getPlayerByUserId);
router.put('/players/:_id', playerController.updatePlayer);


/*Club Controller*/
router.post('/clubs/register',uploadsManager.upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
]), clubController.registerClub);
router.get('/clubs/:_id', clubController.findById);
router.get('/clubs/results/:_id', clubController.findById);


router.get('/clubs/', clubController.findAllClubs);


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
router.put('/comments/changeComment/', commentController.updateComment);
router.get('/comments/:_id', commentController.findAllCommentForAClub);
router.get('/comments/authorComment/:_id', commentController.findAllAuthorComments);
router.delete('/comments/:_id', commentController.deleteComment);

/* Tournament Controller */
router.post('/tournament/register', tournamentController.createTournament);

module.exports = router;