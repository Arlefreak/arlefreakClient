'use strict';
const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env'), silent: true});
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const ejs = require('ejs');
const port = parseInt(process.env.PORT, 10) || 8000;
const DEV = process.env.NODE_ENV !== 'production';

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));
app.get('/*', require('./routes').index);

app.use(methodOverride());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.listen(port, '0.0.0.0', function onStart(err) {
    var info = `==> Listening on port ${port}. Open up http://0.0.0.0:${port}/ DEV: ${DEV}`;
    if (err) {
        console.log(err);
    }
    console.info(info);
});
