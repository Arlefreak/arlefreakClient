import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './routes.jsx';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import portfolioApp from '../reducers/reducers';

const loggerMiddleware = createLogger();
let store =  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)(portfolioApp);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Routes />
            </Provider>
        );
    }
}
