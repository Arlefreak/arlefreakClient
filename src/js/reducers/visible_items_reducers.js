import { SET_VISIBLE_ITEMS } from '../actions';

const visibleItems = (state = [], action) => {
    switch (action.type){
        case SET_VISIBLE_ITEMS:
            return action.projects;
            break;
        default:
            return state;
            break;
    }
};
