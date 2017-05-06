import fetch from 'isomorphic-fetch';
import constants from '../constants.js';

const apiURL = constants.APIURL;

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

export function apiFetchIfNeeded(endPoint){
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
