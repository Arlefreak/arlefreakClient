import { combineReducers } from 'redux';
import { API_REQUEST, API_RESPONSE, SET_CATEGORY_FILTER, ADD_TAG_FILTER, DELETE_TAG_FILTER, CLEAR_ALL_TAG_FILTERS } from '../actions/actions';

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
    var exists = false;
    var i = 0;
    var index = 0;
    switch (action.type) {
        case ADD_TAG_FILTER:
        case DELETE_TAG_FILTER:
            for(i; i < state.length; i++){
                if(state[i].id === action.id){
                    exists = true;
                    index = i;
                    break;
                }
            }
            if(exists){
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return [
                ...state,{
                    id: action.id,
                    name: action.name
                }
            ];
        case CLEAR_ALL_TAG_FILTERS:
            return [];
        default:
            return state;
    }
};

function apiCalls(state = {}, action) {
    switch (action.type) {
        case API_RESPONSE:
            return Object.assign({}, state, {
                [action.endPoint]: items(state[action.endPoint], action)
            });
        default:
            return state;
    }
};

const items = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case API_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case API_RESPONSE:
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
    apiCalls,
    categoryFilter
});

export default portfolioApp;
