import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Loading from './loading.jsx';
import Id from './id.jsx';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Page = ({ id, title, isFetching, children, meta_description}) => {
    let child;
    const meta_title = title || 'ellugar.co';

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
        <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionEnter={true}
            transitionLeave={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            component = "div"
        >
            <Helmet
                title={ meta_title }
                meta={[
                    {'property': 'og:title', 'content': meta_title},
                    {'name': 'twitter:title', 'content': meta_title},
                    {'name': 'description', 'content': meta_description},
                    {'property': 'og:description', 'content': meta_description},
                    {'name': 'twitter:description', 'content': meta_description},
                ]}
            >
            </Helmet>
            {child}
        </CSSTransitionGroup>
    );
};

Page.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    meta_description: PropTypes.string.isRequired,
};

export default Page;
