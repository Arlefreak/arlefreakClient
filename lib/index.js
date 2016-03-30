'use strict';
import express from 'express';
import path from 'path';
require('dotenv').config({path: path.resolve(__dirname, './.env')});
import bodyParser from  'body-parser';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';

import React from 'react';
import renderToString from 'react-dom/server';
import { createStore } from 'redux';
import { Provider }  from 'react-redux';
import AppReducer from './src/js/reducers/reducers.js';
import App from './src/js/components/app.jsx';

var port = parseInt(process.env.PORT, 10) || 8000;
var app = express();

// app.use(handleRender);

function handleRender(req, res) {
};

function renderFullPage(html, initialState) {
};



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
