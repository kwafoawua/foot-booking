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


//*User Controller*//
router.post('/users/authenticate', userController.authenticate);
router.get('/users/', userController2.getAll);
router.put('/users/:_id', userController2.update);
router.delete('/users/:_id', userController2._delete);
router.get('/users/current', userController2.getCurrent);


/*Player Controller*/
router.post('/players/register', playerController.registerPlayer);
router.get('/players/:_id', playerController.findById);
//router.get('/players/:_id', playerController.getPlayerByUserId);


/*Club Controller*/
router.post('/clubs/register',uploadsManager.upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
]), clubController.registerClub);
router.get('/clubs/:_id', clubController.findById);
router.get('/clubs/results/:_id', clubController.findById);


router.get('/clubs/', clubController.findAllClubs);


router.get('/findClub/:clubfilter', clubController.findClubsByFilter);




module.exports = router;

