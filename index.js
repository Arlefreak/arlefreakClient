'use strict';
var express = require('express');
var path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var port = parseInt(process.env.PORT, 10) || 8000;

app.use(express.static(__dirname + '/public'));
app.get('/*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use(methodOverride());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.listen(port);
console.log('server started on port ' + port);
