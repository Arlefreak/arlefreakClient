import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './app.jsx';
import Projects from './projects.jsx';
import About from './about.jsx';
import Soon from './soon.jsx';

class Routes extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Soon} /> 
                    <Route path="projects" component={Projects}/>
                    <Route path="about" component={About} />
                </Route>
            </Router>
        );
    }
}

export default Routes;
