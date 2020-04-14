'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Player = require('../models/Player');
var User = require('../models/User');
var Q = require('q');
const utils = require('../utils');

/**
 * Create a Player
 */
module.exports.registerPlayer = async function (req,res) {
    try {
        await addPlayer(req.body);
        res.status(200).send({success: 'Usuario creado con éxito'});
    } catch (error) {
        console.log('error',error);
        res.status(400).send({ errorMessage: error.message });
    }
};

async function addPlayer (player) {
    console.log('entra al player');
    const user = await User.findOne({$or : [{ 'username': player.username }, {'email': player.email}]}).exec();
    if(user) {
        return utils.throwError('El nombre '+player.username+' o email '+player.email+' está en uso.')
    }
    const newPlayer = new Player({
        name: player.name,
        lastName: player.lastName,
        birthDate: player.birthDate,
        phoneNumber: player.phoneNumber,
        dni : player.dni
    });

    const newUser = new User({
        username: player.username.toLowerCase(),
        email: player.email,
        creator: newPlayer,
        rol: 'Player'
    });
    newUser.password = newUser.setPassword(player.password);
    const savedUser = await newUser.save();
    const savedPlayer = await newPlayer.save();
    if(!savedUser || !savedPlayer) {
        return utils.throwError('No se pudo crear el usuario');
    }
};


/**
 * Show the current Player
 */
module.exports.findById = function(req, res) {
    console.log(req);

    console.log(req.params._id);
    Player.findById(req.params._id, function(err, player) {
        if (err) {

            return res.status(500).send(err);
        }
        console.log('GET /Player/' + player);

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

    console.log('entra al update player con: ');
    console.log('_id : ' + req.body._id);
    console.log('nombre: ' + req.body.name);
    console.log('birthDate: ' + req.body.birthDate);

    Player.findById({_id : req.body._id}, function(err, player){
        if(err){
            console.log("No se encontro al player con _id: " + req.body._id);
            return res.status(500).send(err);
        } else {
            console.log("Se encontró al player");
            player.name = req.body.name || player.name;
            player.lastName = req.body.lastName || player.lastName;
            player.phoneNumber = req.body.phoneNumber || player.phoneNumber;
            player.dni = req.body.dni || player.dni;
            player.birthDate = req.body.birthDate || player.birthDate;
            //player.biography = req.body.biography || player.biography;

            // Save the updated document back to the database
            player.save(function(err, player){
                if(err){
                    return res.status(500).send(err);
                }else {
                    res.status(200).send(player);
                }
            });
        }
    });
};

/**
 * Delete a Player Esto no borra nada
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

/**
*   Get by user id
*/
module.exports.getPlayerByUserId = function(req, res) {

    console.log("Id del user que entra: " + req.params._id);

    User.findById({_id:req.params._id}, function(err, user){
         if(err){
            console.log("No se encontro user");
            return res.status(500).send(err);
        } else {
            console.log("Encontro usuario");
            Player.findById({_id : user.creator}, function(err, player) {
                if(err){
                    console.log("No se encontro jugador");
                    return res.status(500).send(err);
                } else {
                    console.log("Encontro al player");
                    res.status(200).send(player);
                }
            });
        }
    });
};
