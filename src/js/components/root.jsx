import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './header.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, children } = this.props;
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <Header></Header>
                <main>
                    { children }
                </main>
            </div>
        );
    }
}

Root.propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired
};

export default connect()(Root);
