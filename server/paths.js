var pathToRegexp = require('path-to-regexp');

var findClub = pathToRegexp('/findClub/:clubfilter');
var findClubsByFilters = pathToRegexp('/findClubsByFilters/:clubfilter');
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
        getResultById,
        findClubsByFilters
    ]
};

//"_id" : ObjectId("5a02044d00345f1d16047bd1")