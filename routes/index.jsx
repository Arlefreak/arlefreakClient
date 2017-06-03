import express from 'express';
import request from 'request';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {renderToString} from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import fetch from 'node-fetch';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from '../src/js/reducers';
import { homeAction } from '../src/js/actions/pages_actions.js';
import App from '../src/js/app.jsx';
import { routes } from '../src/js/routes.js';

const CONFIG_URL = 'https://api.ellugar.co/web_client/config/1/';

const logger = createLogger({
    collapsed: true,
});

let middleware;

if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            logger,
        )
    );
} else {
    middleware = composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
        )
    );
}

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/

const date = new Date(Date.now());
const year = date.getFullYear();
const context = {
    description: '',
    year: year,
    preview: '',
    long_description: '',
    mail: '',
    twitter: '',
    github: '',
    linkdn: '',
};

/* GET home page. */
router.get('*', (req, res) => {
    let route;

    const match = routes.some(_route => {
        const match = matchPath(req.url, _route);
        if (match)
            route = _route;
        return match;
    });


    if (!match) {
        res.status(404).send('Not Found');
        return;
    }

    fetch(CONFIG_URL)
        .then(r => r.json())
        .then(config => {
            const store =  createStore(
                reducer,
                middleware,
            );

            store.dispatch(
                route.loadData()
            ).then(() => {
                const preloadedState = store.getState();
                const react = renderToString(
                    <Provider store={store}>
                        <Router context={{}} location={req.url}>
                            <App />
                        </Router>
                    </Provider>
                );

                res.render('home', Object.assign(config, { title: route.title ,state: preloadedState, react, year }));
            });

        }).catch(err => {
            console.error(err);
            res.status(500).send(error.message);
        });
});

module.exports = router;
