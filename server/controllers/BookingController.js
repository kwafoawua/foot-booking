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

};
function addBooking (booking) {
    var deferred = Q.defer();

    var newBooking = new Booking({});
                newBooking.save(function (err) {
                    if (err) {
                        return deferred.reject(err.name + ' : ' + err.message);
                    } else {
                        return deferred.resolve();
                    }


                });
    return deferred.promise;

}

/**
 * FindBy Functions
 */

module.exports.findById = function(req, res) {

};

module.exports.findAllByPlayer = function (req, res) {};
module.exports.findAllByClub = function (req, res) {};



/**
 * Update a Booking
 */
module.exports.updateBooking = function(req, res) {
};

/**
 * Delete a Booking
 */
module.exports.deleteBooking = function(req, res) {
};
