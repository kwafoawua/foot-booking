'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Club = require('../models/Club');
var User = require('../models/User');

/**
 * Create a Club
 */

module.exports.addClub = function(req, res) {
        /*
    Buscar si existe el usuario
    Si existe return null y ver q mirda se hace en el frontend
    no no existe Tomar los datos del jugador o club y los del usuario
    crear un club o jugador
    crear un usuario
    referenciar el usuario al jugador o club
    y luego guardar el club o jugador y dentro de este guardar el usuario
    
    */
    console.log('entra al club');
    console.log(req.body);
    User.findOne({$or : [{ 'username': req.body.username }, {'email': req.body.email}]},
        function(err, user) {
            if (user) {
                console.log(err);
                return res.json(null);
            } else {

                var newClub = new Club({
                    name: req.body.name,
                    address: req.body.address,
                    phoneNumber: req.body.phoneNumber,
                    fields: req.body.fields || null,
                    services: req.body.services || null,
                    //user: newUser,
                    socialMedia: req.body.socialMedia || null
                });

                var newUser = new User({
                    username: req.body.username.toLowerCase(),
                    email: req.body.email,
                    creator: newClub,
                    rol: 'Club',
                });

                newUser.password = newUser.setPassword(req.body.password);

                 newUser.save(function (err) {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    console.log('nuevo club'+newClub);
                    newClub.save(function (err) {
                        if(err) return res.status(500).send(err);
                        console.log('nuevo user'+newUser);
                        return res.status(200).send('Se ha creado el complejo');
                    });
                 });
            }

        });
};

/**
 * Show the current Club
 */
module.exports.findById = function(req, res) {
    Club.findById(req.params.id, function(err, club) {
        if (err)
            return res.status(500).send(err);
        console.log('GET /Club/' + req.params.id);
        res.status(200).json(club);
    });
};


/**
 * Show all Clubs
 */
module.exports.findAllClubs = function(req, res) {
    Club.find(function(err, clubs) {
            if (err) {
               return res.status(500).send(err);
            }
        console.log('GET /clubController'); 
        res.status(200).json(clubs);
    });
};

/**
 * Update a Club
 */
module.exports.updateClub = function(req, res) {
    Club.findById(req.params.id, function(err, club) {
        // Handle any possible database errors
        if (err) {
            return res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            club.name = req.body.name || club.name,
                club.address = req.body.address || club.address,
                club.phoneNumber = req.body.phoneNumber || club.phoneNumber,
                club.fields = req.body.fields || club.fields,
                club.services = req.body.services || club.services,
                club.socialMedia = req.body.socialMedia || club.socialMedia

            // Save the updated document back to the database
            club.save(function(err, club) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json(club);
            });
        }
    });
};

/**
 * Delete an Club
 */
module.exports.deleteClub = function(req, res) {
    Club.findById(req.params.id, function(err, club) {
        if (err) {
           return res.status(500).send(err);
        }
        
        club.remove(function(err) {
            if (err) {return res.status(500).send(err);}

            console.log('Club successfully deleted!');
            res.json('Club eliminado');
        });
    });
};
