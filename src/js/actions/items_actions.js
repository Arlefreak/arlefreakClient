import { filterByCategory } from './category_filter_actions.js';
import { filterByTags } from './tag_filter_actions.js';

export const SET_VISIBLE_ITEMS = 'SET_VISIBLE_ITEMS';
export function setVisibleItems(items) {
    const ITEMS = items || [];
    return {
        type: SET_VISIBLE_ITEMS,
        items: ITEMS
    };
}

export function filterItems() {
    return function (dispatch, getState){
        const state = getState() || {};
        const apiCalls = state['apiCalls'] || [];
        const current_object = apiCalls['portfolio/projects'] || {};
        const items = current_object.items || [];
        const categoryFilter = state['categoryFilter'];
        const tagFilter = state['tagFilter'] || [];

        let filteredItems = filterByCategory(items, categoryFilter);
        filteredItems = filterByTags(filteredItems, tagFilter);

        dispatch(setVisibleItems(filteredItems));
    };
}

