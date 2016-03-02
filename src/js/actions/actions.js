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

export const API_REQUEST = 'API_REQUEST';
function apiRequest(endPoint) {
    return {
        type: API_REQUEST,
        endPoint
    };
}

export const API_RESPONSE = 'API_RESPONSE';
export function apiResponse(json, endPoint) {
    return {
        type: API_RESPONSE,
        endPoint,
        projects: json,
        receivedAt: Date.now()
    };
}

export function apiFetch(endPoint) {
    return function (dispatch) {
        dispatch(apiRequest(endPoint));
        return fetch(apiURL + endPoint)
        .then(response => response.json())
        .then(json =>
              dispatch(apiResponse(json, endPoint))
             );
    };
}

function apiShouldFetch(state, endPoint) {
    const apiCall = state.apiCalls[endPoint];
    if (!apiCall) {
        return true;
    } else if (apiCall.isFetching) {
        return false;
    } else {
        return false;
    }
}

export function apiFetchIfNeeded(endPoint){
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (apiShouldFetch(getState(), endPoint)) {
            // Dispatch a thunk from thunk!
            return dispatch(apiFetch(endPoint));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}
