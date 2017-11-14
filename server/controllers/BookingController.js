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
    var booking = req.body;
    addBooking(booking)
        .then(function () {
            console.log('Se creo la reserva');
            res.send(200).send('Se creo la reserva');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};
function addBooking (booking) {
    var deferred = Q.defer();
    console.log('El booking '+booking.field);

    var newBooking = new Booking({
        club: {
            id: booking.clubId,
            name: booking.clubName,
            address: booking.clubAddress,
            phoneNumber: booking.clubPhoneNumber
        },
        field: {
            id: booking.fieldId,
            fieldName: booking.fieldName,
            cantPlayers: booking.fieldCantPlayers,
            fieldType : booking.fieldType,
            price: booking.fieldPrice
        },
        playingDate: new Date(booking.playingDate),
        playingTime: booking.playingTime,
       // paidMethod: booking.paidMethod,
        player: {
            name: booking.playerName,
            lastName: booking.playerLastName,
            phoneNumber: booking.playerPhoneNumber,
            id: booking.playerId || null
        }
    });

    console.log( newBooking);
    newBooking.save(function (err) {
        console.log(err);
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

    Booking.find({$or:
            [
               {"club.id":req.params._id},
               {"player.id":req.params._id}
            ]
        }, function (err, booking) {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).send(booking);
    });

};

/**
 * Update a Booking
 */
module.exports.updateBookingStatus = function(req, res) {

    console.log(req.body);
    var bookingId = req.body.bookingId;
    var status = req.body.status;

    setBookingStatus(req.body.bookingId, req.body.status)
        .then(function (estado) {
            console.log(estado);
            res.status(200).send(estado);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
};

function setBookingStatus (bookingId,status) {
    var deferred = Q.defer();

    return Booking.findById(bookingId, function (err, booking) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        } else {
            booking.status = status;
            booking.save(function (err) {
                console.log(err);
                if (err) {
                    return deferred.reject(err.name + ' : ' + err.message);
                }
                console.log(booking.status);
                deferred.resolve({estado:booking.status});

            });
            return deferred.promise;
        }
    }).exec();
}

/**
*   Find hours that are not avaible to booking
*/

module.exports.findAllHoursBookings = function(req, res){};

/**
 * Delete a Booking
 */
module.exports.deleteBooking = function(req, res) {
};
