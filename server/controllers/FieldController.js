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
    console.log(req.body);
    //console.log(req.body);

    console.log(req.body.deletedFields);

    if(req.body.modifiedFields.length > 0) {
        updateField(req.params._id, req.body.modifiedFields);
    }

    if(req.body.newFields.length > 0) {
        addField(req.params._id, req.body.newFields);
    }

    if(req.body.deletedFields.length > 0) {
        deleteField(req.params._id, req.body.deletedFields);
    }

};

function updateField(clubID, modifiedFields) {

 /*   Club.update(
        {_id: clubID}, //query, you can also query for email
        {$set: {fields: modifiedFields}},
        {multi: true} //for multiple documents
    )*/

    Club.findById(clubID, function(err, club) {
        // Handle any possible database errors
        if (err) {
            return res.status(500).send(err);
        } else {
            club.fields = modifiedFields;
            // Save the updated document back to the database
            club.save(function(err, club) {
                if (err) {
                    return res.status(500).send(err);
                }
                //res.status(200).json(club);
            });
        }
    });


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