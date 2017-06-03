// export * from './api_reducers.js';
// export * from './file_reducers.js';
// export * from './visible_items_reducers.js';
// export * from './category_filter_reducers.js';
// export * from './tag_filter_reducers.js';
// export * from './routes_reducers.js';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { route } from './routes_reducers.js';
import { visibleItems } from './visible_items_reducers.js';
import { categoryFilter } from './category_filter_reducers.js';
import { tagFilter } from './tag_filter_reducers.js';
import { apiCalls } from './api_reducers.js';
import { fileCalls } from './file_reducers.js';

export const reducer = combineReducers({
    route,
    visibleItems,
    tagFilter,
    categoryFilter,
    apiCalls,
    fileCalls,
});
