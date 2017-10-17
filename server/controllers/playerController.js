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


/**
 * Show the current Player
 */
module.exports.findById = function(req, res) {
    console.log('busca por id');
    console.log(req);

    console.log(req.params._id);
    Player.findById(req.params._id, function(err, player) {
        if (err) {

            return res.status(500).send(err);
        }
        console.log('GET /Player/' + req.params._id);

        res.send(player);
    });
};


/**
 * Show all Players
 */
module.exports.findAllPlayers = function(req, res) {
    Player.find(function(err, players) {
            if (err) {
               return res.status(500).send(err);
            }
        res.status(200).send(players);
    });
};


/**
 * Update a Player
 */
module.exports.updatePlayer = function(req, res) {
    console.log('&%$&%$%&$&%$&%$&%$&%$&%***************&%$&%$&%$&%$&%$%&$&%$&%$&%$');
    console.log('entra al update player');
    console.log(req.body);
    console.log('');
    console.log(req.body.name);
    User.findById({_id : req.body.idUser}, function(err, user) {
        if(err){
            console.log("No se encontro user");
            return res.status(500).send(err);
        } else {
            console.log("Encontro usuario");
            user.email = req.body.email || user.email
            user.save(function(err, user){
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json(user);
            });

            Player.findById({_id : user.creator}, function(err, player) {
                if(err){
                    console.log("No se encontro jugador");
                    return res.status(500).send(err);
                } else {
                    console.log("Encontro al player");
                    player.name = req.body.name || player.name,
                    player.lastName = req.body.lastName || player.lastName,
                    player.phoneNumber = req.body.phoneNumber || player.phoneNumber
                    player.biography = req.body.biography || player.biography

                    // Save the updated document back to the database
                    player.save(function(err, player) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        //res.status(200).json(player);
                    });
                }
            });
        }
    });
};

/**
 * Delete a Player
 */
module.exports.deletePlayer = function(req, res) {
    Player.findById(req.params.id, function(err, player) {
        if (err) {
           return res.status(500).send(err);
        }
        
        player.remove(function(err) {
            if (err) {return res.status(500).send(err);}

            console.log('Player successfully deleted!');
            res.json('Player eliminado');
        });
    });
};