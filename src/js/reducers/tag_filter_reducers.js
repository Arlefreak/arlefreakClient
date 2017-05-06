import { ADD_TAG_FILTER, DELETE_TAG_FILTER, CLEAR_ALL_TAG_FILTERS } from '../actions/tag_filter_actions';

export const tagFilter = (state = [], action) => {

    var exists = false;
    var i = 0;
    var index = 0;

    switch (action.type) {
        case ADD_TAG_FILTER:
        case DELETE_TAG_FILTER:
            for(i; i < state.length; i++){
                if(state[i].tag_id === action.tag_id){
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
                    tag_id: action.tag_id,
                    tag: action.tag
                }
            ];
        case CLEAR_ALL_TAG_FILTERS:
            return [];
        default:
            return state;
    }
};
