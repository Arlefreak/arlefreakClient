'use strict';
import express from 'express';
import path from 'path';
require('dotenv').config({path: path.resolve(__dirname, './.env')});
import bodyParser from  'body-parser';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider }  from 'react-redux';
import { match, RoutingContext } from 'react-router';

import AppReducer from './src/js/reducers/reducers.js';
import App from './src/js/components/app.jsx';
import routes from './src/js/components/routes.jsx';

var port = parseInt(process.env.PORT, 10) || 8000;
var app = express();

app.use(handleRender);

function handleRender(req, res) {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    console.log(routes);
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            res.status(200).send(renderToString(<RoutingContext {...renderProps} />));
        } else {
            res.status(404).send('Not found');
        }
    });
};

function renderFullPage(html, initialState) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>Redux Universal Example</title>
    </head>
    <body>
    <div id="root">${html}</div>
    <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    <script src="/static/bundle.js"></script>
    </body>
    </html>
    `;
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
