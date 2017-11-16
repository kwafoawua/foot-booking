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
  getRol(req.body.username)
       .then(function (userRol) {
           return FindUser(req.body.username, req.body.password, userRol.rol);
       })
       .then(function (user) {
                if (user) {
                    // authentication successful
                    res.send(user);
                } else {
                    // authentication failed
                    res.status(400).send('Usuario o contraseña incorrecto');
                }
            })
       .catch(function(err) {
                res.status(400).send(err);
       });
};

function getRol(us){
    console.log(us);
    var deferred = Q.defer();
    return User.findOne({username: us}, function (err, user){
        console.log('entra al find de getrol');
        console.log(user);
        if(err) {
            console.log('error');
            return deferred.reject(err.name + ' : ' + err.message);
        }
        if(!user) {
            console.log('no user');
            return deferred.reject('El usuario no existe.');
        }
        console.log(user.rol);
        var userPromise = {rol: user.rol};
        deferred.resolve(userPromise);
        return deferred.promise;
    }).exec();
}


function FindUser(username, password, rol) {
	console.log('Entra al finduders');
	console.log(username + password + rol);

    var deferred = Q.defer();
    User.findOne({ username: username })
    .populate('creator', null, rol)
    .exec(function(err, user) {
        if (err) {
            deferred.reject(err.name + ' : ' + err.message);
            return;
            //console.log(err);
        }
        if(!user) {
            deferred.reject('El usuario no existe.');
            return;
        }

        if (user && bcrypt.compareSync(password, user.password)) {
           console.log('existe');
            deferred.resolve({
                   _id: user._id,
                   playerOrClubId: user.creator._id,
                   username: user.username,
                   email: user.email,
                   rol: rol,
                   token: jwt.sign({ sub: user._id }, config.secret)

                   });
        } else {
           return deferred.reject('Usuario o contraseña incorrecto');
        }
    });
        return deferred.promise;

}


module.exports.getByUsername = function (req, res) {
    getRol(req.params.username)
        .then(function (userRol) {
            return findByUsername(req.params.username, userRol.rol);
        })
        .then(function (user) {
            if (user) {
                // found
                res.send(user);
            } else {
                // not found
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
};

function findByUsername(username, rol) {
    var deferred = Q.defer();
    User.findOne({ username: username })
        .select("-password")
        .populate('creator', null, rol)
        .exec(function(err, user) {
            if (err) {
                deferred.reject(err.name + ' : ' + err.message);
                return;
                //console.log(err);
            }
            if(!user) {
                deferred.reject('El usuario no existe.');
                return;
            }

            if (user) {
                console.log('existe');
                deferred.resolve(user);
            } else {
                deferred.resolve();
            }
        });
    return deferred.promise;

}

/*function findByUsername(username) {
    var deferred = Q.defer();

    User.findById({ _id: _id }).exec(function (err, user) {
        if (err) {deferred.reject(err.name + ': ' + err.message);}

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}*/

module.exports.setEmail = function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    setUserEmail(username, email)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(error){
            res.status(400).send('El email ya está en uso');
        });
};

function setUserEmail(username, email) {
    var deferred = Q.defer();

    return User.findOne({username: username}, function (err, user) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        } else {
            user.email = email;
            user.save(function (err) {
                console.log(err);
                if (err) {
                    return deferred.reject(err.name + ' : ' + err.message);
                }
                console.log(user.email);
                deferred.resolve();

            });
            return deferred.promise;
        }
    }).exec();
}

module.exports.setPassword = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    setUserPassword(username, password)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(error){
            res.status(400).send('No se pudo actualizar la contraseña');
        });
};

function setUserPassword(username, newPassword) {
    var deferred = Q.defer();

    return User.findOne({username: username}, function (err, user) {
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        } else {
            user.password =user.setPassword(newPassword);
            user.save(function (err) {
                console.log(err);
                if (err) {
                    return deferred.reject(err.name + ' : ' + err.message);
                }
                console.log(user.password);
                deferred.resolve();

            });
            return deferred.promise;
        }
    }).exec();
}