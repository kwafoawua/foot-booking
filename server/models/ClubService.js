var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Service Schema
 */

var clubServiceSchema = new Schema({
    clubService: {type: String, enum: ['Parking', 'Techado', 'Buffet', 'Asador', 'Bar', 'Arbitro']}
});

module.exports = mongoose.model('ClubService', clubServiceSchema);