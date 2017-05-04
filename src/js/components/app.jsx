import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Routes from './routes.jsx';
import {
    visibleItems,
    tagFilter,
    categoryFilter,
    apiCalls,
    fileCalls
} from '../reducers';


const app = combineReducers({
    visibleItems,
    tagFilter,
    categoryFilter,
    apiCalls,
    fileCalls,
});

const loggerMiddleware = createLogger();
let store =  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)(app);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}
