import { SET_VISIBLE_ITEMS } from '../actions/items_actions';

export const visibleItems = (state = [], action) => {
  switch (action.type) {
    case SET_VISIBLE_ITEMS:
      return action.items;
      break;
    default:
      return state;
      break;
  }
};
