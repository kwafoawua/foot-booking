var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Comment Schema
 * @param {Club} club - Club that recive the comment.
 * @param {} author - Author that make the comment, can be a club or a player.
 * @param {String} comment - The comment that have been maked.
 * @param {Date} dateCreation - Date an hour of the comment creation.
 * @param {Date} dateModify - Date an hour of the comment modify.
 */

var commentSchema = new Schema({
		club: {
			id: {type: String, required: true},
			name: String
		},
		author: {
			id: {type: String, required: true},
			name: String
		},
		comment: {type: String, required: true},
		dateCreation: {type: Date, default: Date.now},
		dateModify: {type: Date}
	},{
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);


module.exports = mongoose.model('Comment', commentSchema);