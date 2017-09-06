'use strict';
var mongoose = require('mongoose');
var User = require('../models/User');
var Club = require('../models/Club');
var jwt = require('jsonwebtoken');
var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var bcrypt = require('bcryptjs');



module.exports.authenticate = function(req, res) {
   /* FindUser(req.body.username, req.body.password)
    .then(function(user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });*/

  getRol(req.body.username)
       .then(function (rol) {
           return FindUser(req.body.username, req.body.password, rol);
       })
       .then(function (user) {
                if (user) {
                    // authentication successful
                    res.send(user);
                } else {
                    // authentication failed
                    res.status(400).send('Username or password is incorrect');
                }
            })
       .catch(function(err) {
                res.status(400).send(err);
       });
};

function getRol(username){
    var deferred = Q.defer();
    User.findOne({username: username}, function (err, user){
        console.log('entra al find de getrol');
        if(err) {
            return deferred.reject(err.name + ' : ' + err.message);
        }
        if(!user) {
            return deferred.reject('El usuario no existe.');
        }
        deferred.resolve(user.rol);
        return deferred.promise;
    });
}


function FindUser(username, password, rol) {
	console.log('Entra al finduders');
	console.log(username);
    var deferred = Q.defer();
    User.findOne({ username: username })
    .populate('creator', null, rol)
    .exec(function(err, user) {
        if (err) {
            deferred.reject(err.name + ' : ' + err.message);
            return;
            console.log(err);
        }
        if(!user) {
            deferred.reject('El usuario no existe.');
            return;
        }
        console.log('entra con populate');
        console.log(user);
        console.log(err);
        console.log(user.password);
        if (user && bcrypt.compareSync(password, user.password)) {
        	console.log('existe');
            deferred.resolve({
	                _id: user._id,
                    clubId: user.creator._id,
	                username: user.username,
	                email: user.email,
	                token: jwt.sign({ sub: user._id }, config.secret)

           		 });
        } else {
        	deferred.resolve();
        }
    });
        return deferred.promise;

}