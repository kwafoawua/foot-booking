require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongoose = require('mongoose');


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register', '/users', '/clubs/register', '/clubs', '/uploads'] }));

// routes
app.use('/', require('./routes/index'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
/*var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});*/

mongoose.connect(config.connectionString, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) {
        return console.log(error)
    }
    app.listen(port, function() {
        console.log('Server listening on port: ' + port);
    });

});