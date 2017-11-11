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
            id: booking.field.fieldId,
            fieldName: booking.field.fieldName,
            cantPlayers: booking.field.cantPlayers,
            fieldType : booking.field.fieldType,
            services: booking.field.fieldServices,
            price: booking.field.price
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

module.exports.findAllByPlayer = function (req, res) {
    var playerId = JSON.parse(req.body.playerId);
    findByPlayer(playerId)
        .then(function (bookings) {
            res.sendStatus(200).send(bookings);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function findByPlayer (playerId) {
    var deferred = Q.defer();

    Booking.find({ 'player.id': playerId }, function (err, bookings) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        } else {
            deferred.resolve(bookings);
        }
        return deferred.promise;
    }).exec();

}
module.exports.findAllByClub = function (req, res) {
    //o params... ver
    var clubId = JSON.parse(req.body.clubId);
    findByClub(clubId)
        .then(function (bookings) {
            res.sendStatus(200).send(bookings);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function findByClub (clubId) {
    var deferred = Q.defer();

    Booking.find({ 'club.id': clubId }, function (err, bookings) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        } else {
            deferred.resolve(bookings);
        }
        return deferred.promise;
    }).exec();

}

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
