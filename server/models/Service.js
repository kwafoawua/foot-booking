var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Service Schema
 */

var serviceSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    type: String,

});

module.exports = mongoose.model('Service', serviceSchema);
