var express = require('express');
var player = express.Router();
var playerController = require('./controllers/playerController.js');

module.exports = function(app) {

	player.route('/playerController')
	//.get(PlayerController.findAllPlayers)
	.get(PlayerController.getPlayerByUserId)
	.post(PlayerController.addPlayer);

	player.route('/playerController/:id')
	.get(PlayerController.findById)
	.put(PlayerController.updatePlayer)
	.delete(PlayerController.deletePlayer);

	app.use('/api', player)
};