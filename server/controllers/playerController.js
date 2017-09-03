'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Player = require('../models/Player');
var User = require('../models/User');
var Q = require('q');

/**
 * Create a Player
 */
module.exports.registerPlayer = function (req,res) {
    console.log(req);
    addPlayer(req.body)
    .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

};
function addPlayer (player) {
    console.log('entra al player');
    console.log(player);
    var deferred = Q.defer();
    User.findOne({$or : [{ 'username': player.username }, {'email': player.email}]},
        function(err, user) {
            if(err) return deferred.reject(err.name + ' : ' + err.message);

            if (user) {
                console.log(err);
                return deferred.reject('El nombre'+player.username+' o email '+player.email+' está en uso.');

            } else {

                var newPlayer = new Player({
                    name: player.name,
                    lastName: player.lastName, 
                    birthDay: player.birthDay,
                    phoneNumber: player.phoneNumber,
                    //user: newUser
                });

                var newUser = new User({
                    username: player.username.toLowerCase(),
                    email: player.email,
                    creator: newPlayer,
                    rol: 'Player',
                });

                newUser.password = newUser.setPassword(player.password);

                 newUser.save(function (err) {
                    if(err) {
                        return deferred.reject(err.name + ' : ' + err.message);
                    }
                    console.log('nuevo jugador '+ newPlayer);
                    newPlayer.save(function (err) {
                        if(err) return deferred.reject(err.name + ' : ' + err.message);
                        console.log('nuevo user'+newUser);
                        return deferred.resolve();
                    });
                 });
            }

        });
        return deferred.promise;

};