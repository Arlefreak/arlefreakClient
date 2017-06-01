import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './routes.jsx';
import {
    visibleItems,
    tagFilter,
    categoryFilter,
    apiCalls,
    fileCalls,
    route,
} from '../reducers';


const app = combineReducers({
    route,
    visibleItems,
    tagFilter,
    categoryFilter,
    apiCalls,
    fileCalls,
});

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

export const store =  createStore(
    app,
    middleware,
);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}
