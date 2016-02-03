// import { createStore, combineReducers } from 'redux';
// var $ = window.$;
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes.jsx';

var routes = React.createElement(Routes);
ReactDOM.render(routes, document.getElementById('application'));

var i = 1;
console.log(i);
