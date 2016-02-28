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

var i = 1;
console.log(i);

import fetch from 'isomorphic-fetch';
import constants from '../components/constants.js';
const apiURL = constants.APIURL;

export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export function setCategoryFilter(id) {
    return {
        type: SET_CATEGORY_FILTER,
        id
    };
}

export const ADD_TAG_FILTER = 'ADD_TAG_FILTER';
export const DELETE_TAG_FILTER = 'DELETE_TAG_FILTER';
export const CLEAR_ALL_TAG_FILTERS = 'CLEAR_ALL_TAG_FILTERS';

export function addTagFilter(id) {
    return { 
        type: ADD_TAG_FILTER,
        id
    };
}

export function deleteTagFilter(id) {
    return {
        type: DELETE_TAG_FILTER,
        id
    };
}

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
function requestProjects() {
    return {
        type: REQUEST_PROJECTS
    };
}

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export function receivePosts(json) {
    return {
        type: RECEIVE_PROJECTS,
        projects: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

export function fetchPosts() {

    return function (dispatch) {
        dispatch(requestProjects());
        return fetch(apiURL + 'projects')
        .then(response => response.json())
        .then(json =>
              dispatch(receivePosts(json))
             );
    };
}

import { connect } from 'react-redux';
import ProjectList from '../components/projectList.jsx';

const getVisibleProjects = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_BY_CATEGORY':
            return todos.filter(t => t.completed);
        case 'SHOW_BY_TAG':
            return todos.filter(t => !t.completed);
    }
};

const mapStateToProps = (state) => {
    return {
        projects: getVisibleProjects(state.todos, state.visibilityFilter)
    };
};


const VisibleProjectList = connect(
    mapStateToProps
)(ProjectList);

export default VisibleProjectList;

import { combineReducers } from 'redux';
import { REQUEST_PROJECTS, RECEIVE_PROJECTS, SET_CATEGORY_FILTER, ADD_TAG_FILTER, DELETE_TAG_FILTER, CLEAR_ALL_TAG_FILTERS } from '../actions/actions';

const categoryFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case SET_CATEGORY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

const tagFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case ADD_TAG_FILTER:
            return action.filter;
        case DELETE_TAG_FILTER:
            return action.filter;
        case CLEAR_ALL_TAG_FILTERS:
            return action.filter;
        default:
            return state;
    }
};

const projects = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.projects,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

const portfolioApp = combineReducers({
    projects,
    categoryFilter,
    tagFilter
});

console.log(portfolioApp);

export default projects;

const APIURL = 'http://api.arlefreak.com/';

module.exports = {
    APIURL:APIURL
};
