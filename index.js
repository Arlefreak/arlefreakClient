'use strict';
var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 8000;

app.use(express.static(__dirname + '/public'));
app.get('*', function (request, response){
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
