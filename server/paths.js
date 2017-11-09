var pathToRegexp = require('path-to-regexp');

var findClub = pathToRegexp('/findClub/:clubfilter');
var getResultById = pathToRegexp('/clubs/results/:_id');

module.exports.path = {
    path: ['/users/authenticate',
        '/users/register',
        '/users',
        '/clubs/register',
        '/clubs', '/results',
        '/findClub',
        '/findClubsByFilters',
        '/results/club/',
        '/uploads',
        '/players/register',
        findClub,
        getResultById
    ]
};