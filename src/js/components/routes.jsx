import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Header from './header.jsx';
import Soon from './soon.jsx';

import AboutList from '../containers/about__list.js';
import AboutSingle from '../containers/about__single.js';

import DiaryList from '../containers/diary__list.js';
import DiarySingle from '../containers/diary__single.js';

import CvSingle from '../containers/cv__single.js';

import LigojList from '../containers/ligoj__list.js';

import ProjectList from '../containers/project__list.js';
import ProjectSingle from '../containers/Project.js';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-43222844-2');
function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

const Routes = () => (
    <Router>
        <div>
            <Header></Header>
            <main>
                <div className="wrapper">
                    <Switch>

                        <Route path="/projects" component={ProjectList} />
                        <Route path="/projects/:id" component={ProjectSingle} />

                        <Route path="/about" component={AboutList} />
                        <Route path="/about/:id" component={AboutSingle} />

                        <Route path="/cv" component={CvSingle} />

                        <Route path="/diary" component={DiaryList} />
                        <Route path="/diary/:id" component={DiarySingle} />

                        <Route path="/ligoj" component={LigojList} />

                        <Route component={Soon} />
                    </Switch>
                </div>
            </main>
        </div>
    </Router>
);

Routes.propTypes = {
    pathname: PropTypes.string,
};

export default Routes;
