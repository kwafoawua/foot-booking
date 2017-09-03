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
    User.findOne({$or : [{ 'username': player.username }, {'telefono': player.phoneNumber}]},
        function(err, user) {
            if(err) return deferred.reject(err.name + ' : ' + err.message);

            if (user) {
                console.log(err);
                return deferred.reject('El nombre'+player.username+' o telefono '+player.phoneNumber+' está en uso.');

            } else {

                var newPlayer = new Player({
                    name: req.body.player.name,
                    lastName: req.body.player.lastName, 
                    birthDay: req.body.player.birthDay,
                    phoneNumber: req.body.player.phoneNumber,
                    user: newUser
                });

                var newUser = new User({
                    username: Player.username.toLowerCase(),
                    email: Player.email,
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