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
