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
            res.status(200).send({ message: 'Se creo la reserva' });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};
function addBooking (booking) {
    var deferred = Q.defer();

    var newBooking = new Booking({
        mpExternalReference: booking.externalReference,
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
        paidMethod: booking.fee ? 'Mercado Pago' : 'En sitio',
        player: {
            name: booking.playerName,
            lastName: booking.playerLastName,
            phoneNumber: booking.playerPhoneNumber,
            id: booking.playerId || null,
            dni: booking.dni || null
        },
        payment: {
            date: ((booking.fee) ? Date.now() : null),
            fee: booking.fee || null //cambiara cuando se seleccione el pago por mercadopago
        },
        status: booking.status,
        paymentStatus: 'Pendiente de Pago'
    });

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

    var newStatus = {};
    newStatus.bookingId = req.body.bookingId;
    if(req.body.status){
        newStatus.status = req.body.status;
    }

    if(req.body.fee){
        newStatus.fee = req.body.fee;
    }
    console.log('new status');
    console.log(newStatus);
    setBookingStatus(newStatus)
        .then(function (estado) {
            console.log(estado);
            res.status(200).send(estado);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
};

function setBookingStatus (newStatus) {
    var deferred = Q.defer();

    return Booking.findById(newStatus.bookingId, function (err, booking) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);//aprender a parsear errores
        } else {

            if(newStatus.fee !== booking.payment.fee) {

                if(newStatus.fee < booking.field.price && newStatus.fee > 0) {
                    booking.payment.fee = newStatus.fee;
                    booking.payment.date = Date.now();
                    booking.status = 'Pago Parcial';
                }else if(newStatus.fee >= booking.field.price){
                    booking.status = 'Pago Total';
                    booking.payment.fee = newStatus.fee;
                    booking.payment.date = Date.now();
                } else if(newStatus.fee === 0 || !newStatus.fee) {
                    booking.status = ((newStatus.status) ? newStatus.status : 'Pendiente de Pago');
                    booking.payment.fee = newStatus.fee;
                    booking.payment.date = Date.now();
                }
            } else if(newStatus.status) {
                booking.status = newStatus.status;
            }
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
*   Recibe el id de una cancha y un dia
*   Devuelve un horarios de los bookings
*/
module.exports.findAllHoursBookings = function(req, res){
    console.log("Entra al BookingController, metodo findAllHoursBookings");
    Booking.find({$and:
            [
                {"field.id":"5a06574cf0c3f1550117a2a0"},
                //{"field.id":req.params.idField},
                //{"playingDate":req.params.playingDate},
                {"status": {"$ne":"Cancelado"} }
            ]
        }, function (err, booking) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(booking);
    });
};

module.exports.findAllBookingsByFieldAndDay = function(req,res){
    console.log("#");
    console.log("3- Entro al BookingController!!");
    console.log("3.A- El id: " + JSON.parse(req.params.bookingfilter).idField);
    console.log("3.A- EL playingDate: " + JSON.parse(req.params.bookingfilter).playingDate);
    console.log("#");

    Booking.find({$and:
            [
                {"field.id":JSON.parse(req.params.bookingfilter).idField},
                {"playingDate":JSON.parse(req.params.bookingfilter).playingDate},
                {"status": {"$ne":"Cancelado"} }
            ]
        }, function (err, bookings) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(bookings);
    });
};


/**
 * Delete a Booking
 */
module.exports.deleteBooking = function(req, res) {
    var bookingId = req.body.bookingId;

    deleteBooking(bookingId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteBooking (bookingId) {
    var deferred = Q.defer();

    Booking.deleteOne({"_id": bookingId }, function(err){
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        }else{
            deferred.resolve();
        }

        return deferred.promise;
    }).exec();
}

/**
 * Update booking as payed when mercadopago confirm payment.
 * If payment is reject then delete that temporal booking.
 */
exports.updateBookingByExternalReference = async (externalReference, isPaid) => {
    isPaid ?
        await Booking.findOneAndUpdate(
            {mpExternalReference: externalReference},
            {$set:{paymentStatus: 'Pago Total'}},
            {new: true}
            )
        :
        await Booking.findOneAndDelete(
            {mpExternalReference: externalReference}
        );
}
