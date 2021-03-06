'use strict';

const { json } = require('body-parser');
/**
 * Module dependencies.
 */
const _ = require('lodash');
const Player = require('../models/Player');
const utils = require('../utils');
const { sendEmail } = require('./mailing');

/**
 * Create a Player
 */
module.exports.registerPlayer = async function (req,res) {
    const player = req.body;
    try {
        const newPlayer = new Player({
            name: player.name,
            lastName: player.lastName,
            uid: player.uid,
            email: player.email,
            poviderId: player.providerId,
            photoURL: player.photoURL,
            phoneNumber: player.phoneNumber,
        });
console.log('lo q entro  del register: '+JSON.stringify(req.body));
        const savedPlayer = await newPlayer.save();
        await sendEmail(player.name, player.email);
        //const token = utils.generateToken(savedPlayer._id);

        res.status(200).send({ user: {...savedPlayer._doc}, success: 'Usuario creado con éxito' });
    } catch (error) {
        console.log('error',error);
        res.status(500).send({ errorMessage: error.message });
    }
};


/**
 * Show the current Player
 */
module.exports.findById = function(req, res) {

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
    console.log('email: ' + req.body.email);

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
            player.email = req.body.email || player.email;

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
module.exports.getPlayerByUserId = async function(req, res) {
    console.log("Id del user que entra: " + req.params._id);
    try {
        const player = await Player.findById({_id:req.params._id}).exec();
        res.status(200).send(player);
    } catch (error) {
        console.log("No se encontro jugador");
        return res.status(404).send(error);
    }
};
