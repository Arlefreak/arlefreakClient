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
