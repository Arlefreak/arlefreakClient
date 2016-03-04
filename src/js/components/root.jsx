import React, { Component, PropTypes } from 'react';
import Header from './header.jsx';
import { bindActionCreators } from 'redux';
import { fileFetchIfNeeded, apiFetchIfNeeded, setVisibleProjects } from '../actions/actions';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, children } = this.props;
        dispatch(apiFetchIfNeeded('projects'));
        dispatch(apiFetchIfNeeded('projectsCategories'));
        dispatch(apiFetchIfNeeded('tags'));
        dispatch(apiFetchIfNeeded('images'));
        dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'));
    }

    render() {
        const { children } = this.props;
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
}

Root.propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired
};

export default connect()(Root);
