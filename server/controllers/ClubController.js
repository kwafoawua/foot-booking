'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Club = require('../models/Club');
var User = require('../models/User');
var Q = require('q');
var multer = require('./uploads');

/**
 * Create a Club
 */
module.exports.registerClub = function (req,res) {
    console.log(req);
    console.log(req.file);
    var profilePath = req.file.path.replace('//', '/');
    var club = JSON.parse(req.body.body);
     addClub(club, profilePath)
    .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

};
function addClub (club, profilePath) {
    console.log('entra al club');
    //var clubcoso = JSON.parse(fullClub.body);
    //console.log(clubcoso);

    var deferred = Q.defer();
    User.findOne({$or : [{ 'username': club.username }, {'email': club.email}]},
        function(err, user) {
            if(err) return deferred.reject(err.name + ' : ' + err.message);

            if (user) {
                console.log(err);
                return deferred.reject('El nombre'+club.username+' o email '+club.email+' está en uso.');

            } else {


                var newClub = new Club({
                    name: club.name,
                    address: {
                        lat: club.address.lat,
                        lng: club.address.lng,
                        address: club.address.address
                    },
                    phoneNumber: club.phoneNumber,
                    fields: club.fields || null,
                    services: club.services,
                    socialMedia: club.socialMedia || null,
                    profileImg: profilePath,
                    description: club.description
                });

                var newUser = new User({
                    username: club.user.username.toLowerCase(),
                    email: club.user.email,
                    creator: newClub,
                    rol: 'Club',
                });

                newUser.password = newUser.setPassword(club.user.password);

                 newUser.save(function (err) {
                    if(err) {
                        return deferred.reject(err.name + ' : ' + err.message);
                    }
                    console.log('nuevo usuario'+newClub);
                    newClub.save(function (err) {
                        if(err) return deferred.reject(err.name + ' : ' + err.message);
                        console.log('nuevo club'+newUser);
                        return deferred.resolve();
                    });
                 });
            }

        });
        return deferred.promise;

};

/**
 * Show the current Club
 */
module.exports.findById = function(req, res) {
    console.log('busca por id');
    console.log(req);

    console.log(req.params._id);
    Club.findById(req.params._id, function(err, club) {
        if (err) {

            return res.status(500).send(err);
        }
        console.log('GET /Club/' + req.params._id);

        res.send(club);
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
        res.status(200).send(clubs);
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
