'use strict';
const { Errors, SuccessMessage } = require('../constants');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');
const utils = require('../utils');
const Player = require('../models/Player');
const Club = require('../models/Club');

module.exports.authenticate = async function(req, res) {
  try {
    console.log(req.body);
    // TODO: generalizar para club y player
      const player = await Player.findOne({ uid: req.body.uid }).exec();
      const club = await Club.findOne({ uid: req.body.uid }).exec();
      const user = player || club;
      const token = utils.generateToken(user._id);
      res.status(200).send({...user._doc, token});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

async function getRol(username){
    console.log(username);
    const user = await User.findOne({username: username});
    return user ? user.rol : utils.throwError(Errors.NO_USER);
}

async function findUser(username, password, rol) {
	console.log('Entra al finduders');
	console.log(username + password + rol);

	const user = await User.findOne({ username: username }).populate('creator', null, rol);
	if(!user) {
	  return utils.throwError(Errors.NO_USER);
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
    return utils.throwError(Errors.INVALID_USER);
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
    return utils.throwError(Errors.NO_USER);
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
