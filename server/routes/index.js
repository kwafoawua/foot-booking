/**
file where the routes are defined
*/
var express = require('express');
var router = express.Router();

var clubController = require('../controllers/ClubController.js');
var userController = require('../controllers/userController.js');
var userController2 = require('../controllers/users.controller.js');
var uploadsManager = require('../controllers/uploads');
var multer = require('../controllers/uploads');

/*router.post("/uploads", upload.single("image"), function (req, res) {
    console.log(req.bo)
    console.log('files', req.file);
    res.send(req.file);
});*/




router.post('/users/authenticate', userController.authenticate);
router.post('/clubs/register',multer.upload.single("image"), clubController.registerClub);
router.get('/clubs/:_id', clubController.findById);
router.get('/users/', userController2.getAll);
router.get('/users/current', userController2.getCurrent);
router.put('/users/:_id', userController2.update);
router.delete('/users/:_id', userController2._delete);
router.get('/clubs/', clubController.findAllClubs);
//router.post('/uploads/', uploadsManager.upload.single('image'), uploadsManager.uploadSingleImage);
/*router.post('/uploads/', multer({dest: '../../uploads'}).single('image'), function (req, res) {
	console.log(req.file);
	res.send(req.file);
});*/

module.exports = router;

