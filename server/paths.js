var pathToRegexp = require('path-to-regexp');

var findClub = pathToRegexp('/findClub/:clubfilter');

module.exports.path = {
    path: ['/users/authenticate',
        '/users/register',
        '/users',
        '/clubs/register',
        '/clubs', '/results',
        '/findClub',
        '/results/club/',
        '/uploads',
        findClub]
};