'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Club = require('../models/Club');
var Q = require('q');
//var async = require('async');
var ObjectId = mongoose.Types.ObjectId;





/**
 * Update Club Fields
 * @param req
 * @param res
 */
module.exports.updateFields = function(req, res) {
    console.log(req.params._id);
    //console.log(req.body);

    console.log(req.body.deletedFields);
    if(req.body.newFields.length > 0) {
        addField(req.params._id, req.body.newFields);
    }

    if(req.body.deletedFields.length > 0) {
        deleteField(req.params._id, req.body.deletedFields);
    }




};

function updateField(clubID, modifiedFields) {

}

async function deleteField(clubID, deletedFields){

        for (var i = 0; i < deletedFields.length; i++) {
            try {
                var string = await Club.update({_id: clubID},{$pull: {fields:{_id : deletedFields[i]}}},{ 'new': true }, function (err) {
                    if (err){
                        console.log(err);
                    }else {
                        console.log(err);
                    }

                });

            }catch(error) {
                console.error(error);
            }
        }


}

// function deleteField(clubID,deletedFields) {
//     Club.update({_id: clubID},{$pull: {fields:{ $in:{_id : deletedFields}}}},{ 'new': true }).exec();
// }

function addField(clubID, newFields){
    Club.update( {_id: clubID},
        {$addToSet: {fields: {$each: newFields}}},
        {upsert: true}, function (err){

        if(err) {
            console.log(err);
        }else{
            console.log('se guardaron')
        }

        });
}