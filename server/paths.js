var pathToRegexp = require('path-to-regexp');

var findClub = pathToRegexp('/findClub/:clubfilter');
var findClubsByFilters = pathToRegexp('/findClubsByFilters/:clubfilter');
var getResultById = pathToRegexp('/clubs/results/:_id');
var findAllByReferenceId = pathToRegexp('/booking/:_id');
var updateBookingStatus = pathToRegexp('/booking')

module.exports.path = {
    path: [
        '/users/authenticate',
        '/users/register',
        '/users',
        '/clubs/register',
        '/clubs', 
        '/results',
        '/findClub',
        '/findClubsByFilters',
        '/results/club/',
        '/uploads',
        '/players/register',
        '/book',
        findClub,
        getResultById,
        findClubsByFilters,
        findAllByReferenceId,
        updateBookingStatus
    ]
};