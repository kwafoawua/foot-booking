var pathToRegexp = require('path-to-regexp');

var findClub = pathToRegexp('/findClub/:clubfilter');
var findClubsByFilters = pathToRegexp('/findClubsByFilters/:clubfilter');
var getResultById = pathToRegexp('/clubs/results/:_id');
var findAllByReferenceId = pathToRegexp('/booking/:_id');
var updateBookingStatus = pathToRegexp('/booking');
var findAllHoursBookings = pathToRegexp('/bookings/getHoursToPlay');
var findAllBookingsByFieldAndDay = pathToRegexp('/bookings/horarios/:_id');
var createComment = pathToRegexp('/comments/create');
var updateComment = pathToRegexp('/comments/changeComment/');
var findAllCommentForAClub = pathToRegexp('/comments/:_id');
var findAllAuthorComments = pathToRegexp('/comments/authorComment/:_id');
var deleteComment = pathToRegexp('/comments/:_id');

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
        updateBookingStatus,
        findAllHoursBookings,
        findAllBookingsByFieldAndDay,
        createComment,
        updateComment,
        findAllCommentForAClub,
        findAllAuthorComments,
        deleteComment
    ]
};