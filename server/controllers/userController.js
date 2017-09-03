'use strict';
var mongoose = require('mongoose');
var User = require('../models/User');
var Club = require('../models/Club');
var jwt = require('jsonwebtoken');
var Q = require('q');
var config = require('config.json');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

/*
    Mongo find query:

    collection.find(query[[[, fields], options], callback]);

    query - is a query object, defining the conditions the documents need to apply
    fields - indicates which fields should be included in the response (default is all)
    options - defines extra logic (sorting options, paging etc.)
    raw - driver returns documents as bson binary Buffer objects, default:false
    callback has two parameters - an error object (if an error occured) and a cursor object.
*/


/*

module.exports.authenticate = function(req, res) {

    var deferred = Q.defer();

    User.find(
        {
            "username":req.body.username,
            "password":req.body.password
        }, 
        {
            "rol": true
        },
        function(err, item){
            if (err) {
                deferred.reject(err.name + ' : ' + err.message);
                console.log('Error: ' + err);
                return;
            } if(!item) {
            deferred.reject('El usuario no existe.');
            return;
            } else{
                console.log("*%*%*%*%*%*%*%*%*%*ENTRO*%*%*%*%*%*%*%*%*%");
                return;
            }

        }
    );


    //User.find([{"username":req.body.username},{"password":req.body.password}],{"rol": true});

};

*/


module.exports.authenticate = function(req, res) {
    getRol(req.body.username, req.body.password)
    .then(function (userData) {
        console.log(userData);
        return FindUser(userData.username, userData.password, userData.userRol);
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



    /**FindUser(req.body.username, req.body.password)
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
    */
};

function getRol(username, password) {
    var deferred = Q.defer();
    User.findOne({username: username}, function (err, user){
        if(err) {
            return deferred.reject(err.name + ' : ' + err.message);
        }
        if(!user) {
            return deferred.reject();
        }else {
            deferred.resolve({username: username, password: password, userRol: user.rol});
        }
                console.log('perro*********'+user.rol);

        //var userRol = user.rol;
        return deferred.promise;
    });
}

function FindUser(username, password, rol) {
	console.log('*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*%*');
    console.log('Entra al find users');
	console.log(username);
    var deferred = Q.defer();

//validar antes q rol no sea null o un erro o no se q
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
        console.log(user.creator._id);
        console.log(err);
        console.log(user.password);
        if (user && bcrypt.compareSync(password, user.password)) {
        	console.log('existe');
            deferred.resolve({
	                _id: user._id,
                    rolId: user.creator._id,
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