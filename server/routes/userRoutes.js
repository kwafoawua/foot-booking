'use strict';
var express = require('express');
var userRoute = express.Router();
var userController = require('./controllers/userController.js');

userRoute.route('/login')  
  .post(userController.login);

module.exports = userRoute;