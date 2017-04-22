import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter as Router, Match, Route, IndexRoute } from 'react-router';
import Soon from './soon.jsx';
import Root from './root.jsx';

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

{/* <IndexRoute component={Soon} /> */} 

class Routes extends Component {
    render() {
        return (
            <Router onUpdate={logPageView}>
                <div>
                    <Match pattern={this.props.pathname} component={Root} />
                    <Match exactly pattern={this.props.pathname} render={() => <Soon />}/>
                    <Match path="projects" component={Soon} />
                    <Match path="projects/:id" component={Soon} />
                    <Match path="about" component={Soon} />
                    <Match path="about/:id" component={Soon} />
                    <Match path="cv" component={Soon} />
                    <Match path="diary" component={Soon} />
                    <Match path="diary/:id" component={Soon} />
                    <Match path="ligoj" component={Soon} />
                    <Match path="*" component={Soon} />
                </div>
            </Router>
        );
    }
}

Routes.propTypes = {
    pathname: PropTypes.string,
};

export default Routes;
