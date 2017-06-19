import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routeChanged } from './actions/routes_actions';
import ReactGA from 'react-ga';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { clearTagFilter } from './actions/tag_filter_actions';
import { setCategoryFilter } from './actions/category_filter_actions';
import { filterItems } from './actions/items_actions';
import { setAudioPosition, setPlayStatus, setAudioBytesLoaded, setAudioBytesTotal } from './actions/audio_actions';

import { reducer } from './reducers';
import Routes from './app.jsx';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const logger = createLogger({
    collapsed: true,
});

let middleware;

if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            logger,
        )
    );
} else {
    middleware = composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
        )
    );
}

export const store =  createStore(
    reducer,
    preloadedState,
    middleware,
);

class TrackPageView extends React.Component {
    componentWillMount() { logPageView(); }
    componentWillUpdate() { logPageView(); }
    render() { return <Route children={this.props.children}/> }
}

// TODO: React router 4 fix https://github.com/react-ga/react-ga/issues/122
ReactGA.initialize('UA-43222844-13');


const logPageView = () => {
    store.dispatch(routeChanged(window.location.pathname));

    store.dispatch(clearTagFilter());
    store.dispatch(setCategoryFilter(0, 'All'));
    store.dispatch(filterItems());

    store.dispatch(setAudioPosition(0));
    store.dispatch(setPlayStatus(false));
    store.dispatch(setAudioBytesLoaded(0));
    store.dispatch(setAudioBytesTotal(0));

    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <TrackPageView>
                        <Routes />
                    </TrackPageView>
                </Router>
            </Provider>
        );
    }
}
