var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Team Schema
 */

var teamSchema = new Schema({
	name: {type: String, required: true},
	players: [{type: String, required: true}],
	points: Number,
});

module.exports = mongoose.model('Player', playerSchema);
