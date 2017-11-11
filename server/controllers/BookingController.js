'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Booking = require('../models/Booking');
var Q = require('q');


/**
 * Create a Booking
 */
module.exports.registerBooking = function (req,res) {
    var booking = JSON.parse(req.body);
    addBooking(booking)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};
function addBooking (booking) {
    var deferred = Q.defer();

    var newBooking = new Booking({
        club: {
            id: booking.club.id,
            name: booking.club.name,
            address: booking.club.address,
            phoneNumber: booking.club.phoneNumber
        },
        field: {
            id: booking.club.fieldId,
            fieldName: booking.club.fieldName,
            cantPlayers: booking.club.cantPlayers,
            fieldType : booking.club.fieldType,
            services: booking.club.fieldServices,
            price: booking.club.price
        },
        playingDate: booking.playingDate,
        playingTime: booking.playingTime,
        paidMethod: booking.paidMethod,
        player: {
            name: booking.player.name,
            lastName: booking.player.lastName,
            phoneNumber: booking.player.phoneNumber,
            id: booking.player.id
        }
    });
    newBooking.save(function (err) {
                    if (err) {
                        return deferred.reject(err.name + ' : ' + err.message);
                    } else {
                        deferred.resolve();
                    }


                });
    return deferred.promise;

}

/**
 * FindBy Functions
 */

module.exports.findAllByReferenceId = function(req, res) {
    console.log("Entra al findById");

    Booking.find({$or:
            [
               {"club.id":JSON.parse(req.body.referenceId)},
               {"player.id":JSON.parse(req.body.referenceId)}
            ]
        }, function (err, club) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(club);
    });

};

/**
 * Update a Booking
 */
module.exports.updateBookingStatus = function(req, res) {
    var bookingId = req.body.bookingId;
    var status = req.body.status;

    setBookingStatus(bookingId, status)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function setBookingStatus (bookingId,status) {
    var deferred = Q.defer();

    Booking.findById(bookingId, function (err, booking) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        } else {
            booking.status = status;
            booking.save();
            deferred.resolve();
        }
        return deferred.promise;
    }).exec();
}

/**
 * Delete a Booking
 */
module.exports.deleteBooking = function(req, res) {
};
