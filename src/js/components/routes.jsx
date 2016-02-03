import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './app.jsx';
import Projects from './projects.jsx';
import About from './about.jsx';

class Routes extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="projects" component={Projects}/>
                    <Route path="about" component={About} />
                </Route>
            </Router>
        );
    }
}

export default Routes;
