import { filterByCategory } from './category_filter_actions.js';
import { filterByTags } from './tag_filter_actions.js';

export const CHANGE_ITEMS = 'CHANGE_ITEMS';

export const SET_VISIBLE_ITEMS = 'SET_VISIBLE_ITEMS';
export function setVisibleItems(items) {
  const ITEMS = items || [];
  return {
    type: SET_VISIBLE_ITEMS,
    items: ITEMS,
  };
}

export function filterItems() {
  return function(dispatch, getState) {
    const state = getState() || {};
    const apiCalls = state['apiCalls'] || [];

    const route = state['route'] || { name: '/' };

    let current_object = {};

    if (route.name.includes('projects')) {
      current_object = apiCalls['portfolio/projects'] || {};
    } else if (route.name.includes('ligo')) {
      current_object = apiCalls['ligoj/link'] || {};
    } else if (route.name.includes('about')) {
      current_object = apiCalls['about/entry'] || {};
    } else if (route.name.includes('logs')) {
      current_object = apiCalls['diary/posts'] || {};
    } else {
      current_object = apiCalls['portfolio/projects'] || {};
    }

    const items = current_object.items || [];

    const categoryFilter = state['categoryFilter'];
    const tagFilter = state['tagFilter'] || [];

    let filteredItems = filterByCategory(items, categoryFilter);
    filteredItems = filterByTags(filteredItems, tagFilter);
    dispatch(setVisibleItems(filteredItems));
  };
}
