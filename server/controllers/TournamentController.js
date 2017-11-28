'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Tournament = require('../models/Tournament');
var Q = require('q');


/**
 * Create a Tournament
 */
module.exports.createTournament = function (req,res) {
    console.log("En el createTournament");
    var tournament = req.body;
    console.log(tournament);
    addTournament(tournament)
        .then(function () {
            console.log('Se creo el torneo');
            res.send(200).send('Se creo el torneo');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function addTournament (tournament) {
    console.log("En el addTournament");
    console.log(tournament);

    var deferred = Q.defer();

    var newTournament = new Tournament({
        clubId: tournament.clubId,
        name: tournament.name,
        description: tournament.description,
        inicioInscripcion: tournament.inicioInscripcion,
        finInscripcion: tournament.finInscripcion,
        inicioCampeonato: tournament.inicioCampeonato, 
        finCampeonato: tournament.finCampeonato || null,
        cantEquipos: tournament.cantEquipos,
        fee: tournament.fee
    });

    console.log( newTournament);
    newTournament.save(function (err) {
        console.log(err);
                    if (err) {
                        return deferred.reject(err.name + ' : ' + err.message);
                    } else {
                        deferred.resolve();
                    }
                });
    return deferred.promise;
}