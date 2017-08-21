/**
file where the routes are defined
*/
var express = require('express');
var router = express.Router();

var clubController = require('../controllers/ClubController.js');
var userController = require('../controllers/userController.js');
var userController2 = require('../controllers/users.controller.js');


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

router.post('/authenticate', userController.authenticate);
router.post('/register', clubController.addClub);
router.get('/', userController2.getAll);
router.get('/current', userController2.getCurrent);
router.put('/:_id', userController2.update);
router.delete('/:_id', userController2._delete);
module.exports = router;

