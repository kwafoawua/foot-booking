/**
 * Paths que estan fuera del authentication
 * @type {pathToRegexp | ((path: pathToRegexp.Path, keys?: pathToRegexp.Key[], options?: (pathToRegexp.RegExpOptions & pathToRegexp.ParseOptions)) => RegExp)}
 */

var pathToRegexp = require('path-to-regexp');

var findClub = pathToRegexp('/findClub/:clubfilter');
var findClubsByFilters = pathToRegexp('/findClubsByFilters/:clubfilter');
var getResultById = pathToRegexp('/clubs/results/:_id');
var findAllByReferenceId = pathToRegexp('/booking/:_id');
var updateBookingStatus = pathToRegexp('/booking');
var findAllHoursBookings = pathToRegexp('/bookings/getHoursToPlay');
var findAllBookingsByFieldAndDay = pathToRegexp('/bookings/horarios/:_id');

var updateComment = pathToRegexp('/comments/changeComment/');
var findAllCommentForAClub = pathToRegexp('/comments/:_id');
var findAllAuthorComments = pathToRegexp('/comments/authorComment/:_id');
var findAllClubComments = pathToRegexp('/comments/clubComment/:_id');
var deleteComment = pathToRegexp('/comments/:_id');
var newTournament = pathToRegexp('/tournament/register');

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
        '/tournament/register',
        findClub,
        getResultById,
        findClubsByFilters,
        findAllByReferenceId,
        updateBookingStatus,
        findAllHoursBookings,
        findAllBookingsByFieldAndDay,
        findAllCommentForAClub,
        findAllAuthorComments,
        findAllClubComments,
        '/destacados',
        '/mercadopago/preferenceCallBack',
        '/webhook',
        '/mercadopago/linkMPAccount'
    ]
};
