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
import { StickyContainer } from 'react-sticky';

import { routes } from './routes.js';
import Header from './components/header.jsx';

const Routes = () => (
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
                <Switch>
                    {routes.map((route, i)=> (
                        <Route key={i} {...route}/>
                    ))}
                </Switch>
            </div>
        </CSSTransitionGroup>
    </StickyContainer>
);

Routes.propTypes = {
    pathname: PropTypes.string,
};

export default Routes;
