import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes.jsx';
import portfolioApp from './reducers/reducers';
import { VisibilityFilters , setVisibilityFilter} from './actions/actions';

let store = createStore( portfolioApp);
console.log(store.getState());
let unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_BY_CATEGORY));

unsubscribe();

var routes = React.createElement(Routes);
ReactDOM.render(routes, document.getElementById('application'));

var i = 1;
console.log(i);

/*
 * action types
 */

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_BY_CATEGORY: 'SHOW_BY_CATEGORY',
    SHOW_BY_TAG: 'SHOW_BY_TAG'
};

export function setVisibilityFilter(filter, id=-1) {
    return { type: SET_VISIBILITY_FILTER, filter, id };
}

const APIURL = 'http://api.arlefreak.com/';

module.exports = {
    APIURL:APIURL
};

import { SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/actions';
const { SHOW_ALL } = VisibilityFilters;

const portfolioApp = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

module.exports = portfolioApp;
