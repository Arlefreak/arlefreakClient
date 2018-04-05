import { SET_CATEGORY_FILTER } from '../actions/category_filter_actions';

export const categoryFilter = (
  state = {
    id: 0,
    name: 'All',
  },
  action
) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return {
        id: action.id,
        name: action.name,
      };
    default:
      return state;
  }
};
