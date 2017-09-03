var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Player Schema
 * @param {string} name - Player's name.
 * @param {string} lastName - Player's last name.
 * @param {date} birthDate - Player's birthday.
 * @param {string} phoneNumber - Player's phone number.
 * @param {Usuario} user - Club's user.
 */

var playerSchema = new Schema({
	name: {type: String, required: true},
	lastName: {type: String, required: true},
	birthDate: Date,
	phoneNumber: String,
	//user: {type: ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Player', playerSchema);