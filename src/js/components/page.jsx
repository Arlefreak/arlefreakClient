import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Loading from './loading.jsx';
import Id from './id.jsx';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Page = ({ 
    id,
    title,
    isFetching,
    children,
    className,

    meta_url,
    meta_title,
    meta_description,
    meta_preview,
    meta_audio,
}) => {
    let child;

    if(isFetching) {
        child = 
            <div>
                <Loading/>
                <Id index={ id }/>
            </div>;
    } else {
        child = 
            <div className={ className }>
                { title != null && 
                        <h1>{title}</h1>
                }
                { children }
                <Id index={id}/>
            </div>;
    }

    let description = meta_description;
    if(meta_description.length > 140)
        description = `${description.substring(0, 140)} ...`;

    let meta= [
        {'property': 'og:title', 'content': meta_title},
        {'name': 'twitter:title', 'content': meta_title},

        {'property': 'og:url', 'content': meta_url},
        {'name': 'twitter:url', 'content': meta_url},

        {'property': 'og:image', 'content': meta_preview},
        {'name': 'twitter:image', 'content': meta_preview},

        {'name': 'description', 'content': description},
        {'property': 'og:description', 'content': description},
        {'name': 'twitter:description', 'content': description},
    ];

    if(meta_audio)
        meta.push({'property': 'og:audio', 'content': meta_audio});

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
                meta={ meta }
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
    className: PropTypes.string,

    meta_description: PropTypes.string.isRequired,
    meta_url: PropTypes.string.isRequired,
    meta_title: PropTypes.string.isRequired,
    meta_preview: PropTypes.string.isRequired,
    meta_audio: PropTypes.string,
};

export default Page;
