'use strict';
const { Errors, SuccessMessage } = require('../constants');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config.json');
const bcrypt = require('bcryptjs');

function throwError(message) {
  throw new Error(message);
}

module.exports.authenticate = async function(req, res) {
  try {
    const userRol = await getRol(req.body.username);
    const foundUser = await findUser(req.body.username, req.body.password, userRol);
    res.send(foundUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

async function getRol(username){
    console.log(username);
    const user = await User.findOne({username: username});
    return user ? user.rol : throwError(Errors.NO_USER);
}

async function findUser(username, password, rol) {
	console.log('Entra al finduders');
	console.log(username + password + rol);

	const user = await User.findOne({ username: username }).populate('creator', null, rol);
	if(!user) {
	  return throwError(Errors.NO_USER);
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    console.log('existe');
    return {
      _id: user._id,
      playerOrClubId: user.creator._id,
      username: user.username,
      email: user.email,
      rol: rol,
      token: jwt.sign({ sub: user._id }, config.secret)
    };
  } else {
    return throwError(Errors.INVALID_USER);
  }
}


module.exports.getByUsername = async function (req, res) {
  try {
    const username = req.params.username;
    const rol = await getRol(username);
    const user = await findByUsername(username, rol);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

async function findByUsername(username, rol) {
  const userByUsername = await User.findOne({ username: username }).select("-password").populate('creator', null, rol).exec();
  if(!userByUsername) {
    return throwError(Errors.NO_USER);
  }
  return userByUsername;
}

module.exports.setEmail = async function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const user = await User.findOne({username: username}).exec();
  if(!user) {
   return res.status(400).send(Errors.NO_USER);
  }
  try {
    user.email = email;
    const emailChangedUser = await user.save();
    console.log(emailChangedUser);
    res.status(200).send(SuccessMessage.SUCCESS_EMAIL);
  } catch(error) {
    console.log(error.name + error.message);
    res.status(400).send(Errors.EMAIL_USED)
  }
};

module.exports.setPassword = async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({username: username}).exec();
  if(!user) {
    return res.status(400).send(Errors.NO_USER);
  }
  try {
    user.password = user.setPassword(password);
    await user.save();
    console.log('se cambio la contraseña');
    res.status(200).send(SuccessMessage.SUCCESS_PASSWORD);
  } catch(error) {
    res.status(400).send(Errors.NO_UPDATE_PASSWORD);
  }
};
