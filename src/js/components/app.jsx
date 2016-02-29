import React from 'react';
import Header from './header.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function App({ children }) {
    return (
        <div>
            <Header></Header>
            <main>
                <ReactCSSTransitionGroup 
                    component="div"
                    className="wrapper"
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    { children }
                </ReactCSSTransitionGroup>
            </main>
        </div>
    );
}
