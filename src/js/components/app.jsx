import React from 'react';
import Header from './header.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const App = () => (
    <div>
        <Header></Header>
        <main>
            <ReactCSSTransitionGroup 
                component="div"
                className="wrapper"
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                { this.props.children }
            </ReactCSSTransitionGroup>
        </main>
    </div>
);

export default App;
