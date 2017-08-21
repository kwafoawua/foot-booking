var express = require('express');
var player = express.Router();

module.exports = function(app) {

	player.route('/playerController')
	.get(PlayerController.findAllPlayers)
	.post(PlayerController.addPlayer);

	player.route('/playerController/:id')
	.get(PlayerController.findById)
	.put(PlayerController.updatePlayer)
	.delete(PlayerController.deletePlayer);

	app.use('/api', player)
};