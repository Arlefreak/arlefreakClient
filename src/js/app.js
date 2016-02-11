import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes.jsx';
import portfolioApp from './reducers/reducers';
import { VisibilityFilters , setVisibilityFilter} from './actions/actions';

let store = createStore( portfolioApp);
console.log(store.getState());
let unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_BY_CATEGORY));

unsubscribe();

var routes = React.createElement(Routes);
ReactDOM.render(routes, document.getElementById('application'));
