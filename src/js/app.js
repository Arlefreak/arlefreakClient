import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes.jsx';
import { fetchPosts } from './actions/actions';
import portfolioApp from './reducers/reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    portfolioApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

store.dispatch(fetchPosts());

var routes = React.createElement(Routes);
ReactDOM.render(routes, document.getElementById('application'));
