import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes.jsx';

var routes = React.createElement(Routes);
ReactDOM.render(routes, document.getElementById('application'));

const APIURL = 'http://api.arlefreak.com/';
module.exports = {
    APIURL:APIURL
};

var i = 1;
console.log(i);

import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions';
import  CategoryList from '../components/categoryList.jsx';;

const mapStateToProps = (state, ownProps) => {
    return {
        categoryFilter: {
            id: ownProps.id,
            name: ownProps.name
        }
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setCategoryFilter(ownProps.id, ownProps.name));
        }
    };
};

const CategoryFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList);

export default CategoryFilter;


import { connect } from 'react-redux';
import ProjecList from '../components/projectList.jsx';

const getVisibleProjects = (projects, category) => {
    return projects;
    // switch (category) {
    //     case 'SHOW_ALL':
    //         return todos;
    //     case 'SHOW_COMPLETED':
    //         return todos.filter(t => t.completed);
    //     case 'SHOW_ACTIVE':
    //         return todos.filter(t => !t.completed);
    // }
};

const mapStateToProps = (state) => {
    return {
        projects: getVisibleProjects(state.projects.items)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onProjectClick: (id) => {
            console.log('project click: ' + id);
            // dispatch(toggleTodo(id));
        }
    };
};

const VisibleProjects = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjecList);

export default VisibleProjects;

import fetch from 'isomorphic-fetch';
import constants from '../constants.js';
const apiURL = constants.APIURL;

export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export function setCategoryFilter(id, name) {
    return {
        type: SET_CATEGORY_FILTER,
        id,
        name
    };
}

export const ADD_TAG_FILTER = 'ADD_TAG_FILTER';
export const DELETE_TAG_FILTER = 'DELETE_TAG_FILTER';
export const CLEAR_ALL_TAG_FILTERS = 'CLEAR_ALL_TAG_FILTERS';

export function addTagFilter(id, name) {
    return { 
        type: ADD_TAG_FILTER,
        id,
        name
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
        projects: json,
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

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { fetchPosts, addTagFilter, setCategoryFilter } from './actions/actions';
import portfolioApp from './reducers/reducers';

const loggerMiddleware = createLogger();

// const store = createStore(
//     applyMiddleware(
//         thunkMiddleware, // lets us dispatch() functions
//         loggerMiddleware // neat middleware that logs actions
//     ),
//     portfolioApp
// );

let store =  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)(portfolioApp);

store.dispatch(fetchPosts());
store.dispatch(addTagFilter(1, 'phaser'));
store.dispatch(setCategoryFilter(1, 'Games'));

import { combineReducers } from 'redux';
import { REQUEST_PROJECTS, RECEIVE_PROJECTS, SET_CATEGORY_FILTER, ADD_TAG_FILTER, DELETE_TAG_FILTER, CLEAR_ALL_TAG_FILTERS } from '../actions/actions';

const categoryFilter = (state = {
    id: 0,
    name: 'All'
}, action) => {
    switch (action.type) {
        case SET_CATEGORY_FILTER:
            return {
                id: action.id,
                name: action.name
            };
        default:
            return state;
    }
};

const tagFilter = (state = [], action) => {
    switch (action.type) {
        case ADD_TAG_FILTER:
            return [
                ...state,{
                    id: action.id,
                    name: action.name
                }
            ];
        case DELETE_TAG_FILTER:
            return [
                ...state.slice(0, action.id),
                ...state.slice(action.id + 1)
            ];
        case CLEAR_ALL_TAG_FILTERS:
            return [];
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
    tagFilter,
    projects,
    categoryFilter
});

export default portfolioApp;
