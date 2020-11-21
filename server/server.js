require('dotenv').config();
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('config.json');
const mongoose = require('mongoose');
const pathList = require('./paths');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use('/uploads', express.static(__dirname + '/uploads'));

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

}).unless(pathList.path));


// routes
app.use('/', require('./routes/index'));

// set port
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

const createUploadFolder = () => {

}

mongoose.connect(config.connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) {
        return console.log(error);
    }
    app.listen(port, function() {

        fs.exists('./uploads', (exists) => {
            if(exists) fs.mkdir('./uploads' , (err) => {
            });
        });
        console.log('Server listening on port: ' + port);
    });

});
