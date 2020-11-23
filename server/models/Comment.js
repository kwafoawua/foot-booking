var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * Comment Schema
 * @param {Club} club - Club that recive the comment.
 * @param {} author - Author that make the comment, can be a club or a player.
 * @param {String} comment - The comment that have been maked.
 * @param {Date} dateCreation - Date an hour of the comment creation.
 * @param ex{Date} dateModify - Date an hour of the comment modify.
 */

const commentSchema = new Schema({
        _idClub: {type: String, required: true},
        userName: {type: String, required: true},
        comment: {type: String, required: true},
        createdOn: {type: Date, default: Date.now},
        dateModify: {type: Date}
    }
);
commentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Comment', commentSchema);
