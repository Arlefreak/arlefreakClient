import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Root from './root.jsx';
import About from '../containers/About.js';
import Entry from '../containers/Entry.js';
import Soon from './soon.jsx';
import Portfolio from '../containers/Portfolio.js';
import Project from '../containers/Project.js';
import CV from '../containers/CV.js';
import Diary from '../containers/Diary.js';
import DiaryPost from '../containers/DiaryPost.js';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-43222844-2');
function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

class Routes extends Component {
    render() {
        return (
            <Router history={ hashHistory } onUpdate={logPageView}>
                <Route path="/" component={Root}>
                    <IndexRoute component={Soon} /> 
                    <Route path="projects" component={Portfolio} />
                    <Route path="projects/:id" component={Project} />
                    <Route path="about" component={About} />
                    <Route path="about/:id" component={Entry} />
                    <Route path="cv" component={CV} />
                    <Route path="diary" component={Diary} />
                    <Route path="diary/:id" component={DiaryPost} />
                    <Route path="*" component={Soon} />
                </Route>
            </Router>
        );
    }
}

export default Routes;
