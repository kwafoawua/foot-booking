var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Player Schema
 */

var playerSchema = new Schema({
	name: {type: String, required: true},
	lastName: {type: String, required: true},
	birthDate: Date,
	phoneNumber: String,
	user: {type: ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Player', playerSchema);
