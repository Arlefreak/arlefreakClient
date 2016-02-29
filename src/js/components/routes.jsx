import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './app.jsx';
import About from './about.jsx';
import Soon from './soon.jsx';
import ProjecList from '../containers/VisibleProjects.js';
import Projects from '../containers/VisibleProjects.js';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { fetchPosts, addTagFilter, setCategoryFilter } from '../actions/actions';
import portfolioApp from '../reducers/reducers';

const loggerMiddleware = createLogger();
let store =  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)(portfolioApp);

store.dispatch(fetchPosts());

class Routes extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={ hashHistory }>
                    <Route path="/" component={App}>
                        <IndexRoute component={Soon} /> 
                        <Route path="/projects" component={ProjecList} />
                        <Route path="/projects/:id" component={ProjecList} />
                        <Route path="about" component={About} />
                        <Route path="*" component={Soon} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default Routes;
