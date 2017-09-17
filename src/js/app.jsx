import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';

import { StickyContainer } from 'react-sticky';

import { routes } from './routes.js';
import Header from './components/header.jsx';

const Routes = () => (
    <StickyContainer>
        <Header/>
        <div className="wrapper">
            <Switch>
                {routes.map((route, i)=> (
                    <Route key={i} {...route}/>
                ))}
            </Switch>
        </div>
    </StickyContainer>
);

Routes.propTypes = {
    pathname: PropTypes.string,
};

export default Routes;
