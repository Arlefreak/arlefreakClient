import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Header from './header.jsx';
import Soon from './soon.jsx';

import Home from '../containers/home__page.js';

import AboutList from '../containers/about__list.js';
import AboutSingle from '../containers/about__single.js';

import DiaryList from '../containers/diary__list.js';
import DiarySingle from '../containers/diary__single.js';

import CvSingle from '../containers/cv__single.js';

import LigojList from '../containers/ligoj__list.js';

import ProjectList from '../containers/project__list.js';
import ProjectSingle from '../containers/project__single.js';

import ReactGA from 'react-ga';
import { StickyContainer } from 'react-sticky';

import { clearTagFilter } from '../actions/tag_filter_actions';
import { setCategoryFilter } from '../actions/category_filter_actions';
import { routeChanged } from '../actions/routes_actions';
import { store } from './app.jsx';

// TODO: React router 4 fix https://github.com/react-ga/react-ga/issues/122
ReactGA.initialize('UA-43222844-13');

const logPageView = () => {
    store.dispatch(clearTagFilter());
    store.dispatch(setCategoryFilter(0, 'All'));

    store.dispatch(routeChanged(window.location.pathname));

    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

class TrackPageView extends React.Component {
    componentWillMount() { logPageView(); }
    componentWillUpdate() { logPageView(); }
    render() { return <Route children={this.props.children}/> }
}

const Routes = () => (
    <Router>
        <TrackPageView>
            <StickyContainer>
                <Header></Header>
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionAppear={true}
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    component="main"
                >
                    <div className="wrapper">
                        <Switch className="poop">
                            <Route exact path="/projects" component={ProjectList} />
                            <Route path="/projects/:slug" component={ProjectSingle} />

                            <Route exact path="/about" component={AboutList} />
                            <Route path="/about/:slug" component={AboutSingle} />

                            <Route exact path="/cv" component={CvSingle} />

                            <Route exact path="/logs" component={DiaryList} />
                            <Route path="/logs/:slug" component={DiarySingle} />

                            <Route path="/ligoj" component={LigojList} />

                            <Route component={Home} />
                        </Switch>
                    </div>
                </CSSTransitionGroup>
            </StickyContainer>
        </TrackPageView>
    </Router>
);

Routes.propTypes = {
    pathname: PropTypes.string,
};

export default Routes;
