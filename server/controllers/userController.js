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
    FindUser(req.body.username, req.body.password)
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
        });

};


function FindUser(username, password) {
	console.log('Entra al finduders');
	console.log(username);
    var deferred = Q.defer();
    User.findOne({ username: username })
    .populate('creator', null, 'Club')
    .exec(function(err, user) {
        if (err) {
            deferred.reject(err.name + ' : ' + err.message);
            console.log(err);
        }
        console.log('entra con populate');
        console.log(user);
        console.log(err);
        console.log(user.password);
        if (user && bcrypt.compareSync(password, user.password)) {
        	console.log('existe');
            deferred.resolve({
	                _id: user._id,
	                username: user.username,
	                email: user.email,
	                name: user.creator.name,
	                address: user.creator.address,
	                phoneNumber: user.creator.phoneNumber,
	                fields: user.creator.fields,
	                services: user.creator.services,
	                socialMedia: user.creator.socialMedia,
	                token: jwt.sign({ sub: user._id }, config.secret)

           		 });
        } else {
        	deferred.resolve();
        }
    });
        return deferred.promise;

}