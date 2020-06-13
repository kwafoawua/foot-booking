const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.throwError = function(message) {
  throw new Error(message);
}

module.exports.generateToken = function (id) {
  return jwt.sign({ sub: id }, config.secret);
};
