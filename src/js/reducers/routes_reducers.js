import { ROUTE_CHANGED } from '../actions/routes_actions';

export const route = (state = {
    name: '/'
}, action
) => {
    switch (action.type) {
        case ROUTE_CHANGED:
            return {
                name: action.route
            };
        default:
            return state;
    }
};
