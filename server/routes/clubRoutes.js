'use strict';
var express = require('express');
var clubRoute = express.Router();
var clubController = require('./controllers/clubController.js');

clubRoute.route('/complejos')  
  .get(clubController.findAllClubs)
  .post(clubController.addClub);

clubRoute.route('/complejo/:id')  
  .get(clubController.findById)
  .put(clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = clubRoute;