import PropTypes from 'prop-types';
import React from 'react';
import Loading from './loading.jsx';
import Id from './id.jsx';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Page = ({ id, title, isFetching, children }) => {
    let child;
    if(isFetching) {
        child = 
            <div>
                <Loading/>
                <Id index={id}/>
            </div>;
    } else {
        child = 
            <div>
                { title != null && 
                        <h2>{title}</h2>
                }
                { children }
                <Id index={id}/>
            </div>;
    }

    return (
        <div>
            <CSSTransitionGroup
                transitionName="fade"
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {child}
            </CSSTransitionGroup>
        </div>
    );
};

Page.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default Page;
