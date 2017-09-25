/**
file where the routes are defined
*/
var express = require('express');
var router = express.Router();

var clubController = require('../controllers/ClubController.js');
var userController = require('../controllers/userController.js');
var userController2 = require('../controllers/users.controller.js');
var playerController = require('../controllers/playerController');


/*route.route('/complejos')  
  .get(clubController.findAllClubs)
  .post(clubController.addClub);

route.route('/complejo/:id')  
  .get(clubController.findById)
  .put(clubController.updateClub)
  .delete(clubController.deleteClub);

route.route('/login')  
  .post(userController.login);

route.get('/').get(function (req, res) {
	console.log('Pagina principal');
});*/


router.post('/users/authenticate', userController.authenticate);
router.post('/clubs/register', clubController.registerClub);
router.post('/players/register', playerController.registerPlayer);
router.get('/players/:_id', playerController.findById);
router.get('/clubs/:_id', clubController.findById);
router.get('/users/', userController2.getAll);
router.get('/users/current', userController2.getCurrent);
router.put('/users/:_id', userController2.update);
router.delete('/users/:_id', userController2._delete);
router.get('/clubs/', clubController.findAllClubs);
module.exports = router;

