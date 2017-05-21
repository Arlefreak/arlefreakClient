import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Subscribe from './subscribe.jsx';
import Social from './social.jsx';
import Remarkable from 'remarkable';

const Container = ({ id, title, isFetching, items }) => {
    var md = new Remarkable();
    var text = items.subscribeDescription ? items.subscribeDescription : '';
    var mdr = md.render(text);

    return (
        <Page 
            id = { id }
            title = { title }
            isFetching = { false }
        >
            <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }}/>
            <div className="subscribe">
                <Subscribe></Subscribe>
                <Social config={ items }></Social>
            </div>
        </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.shape().isRequired,
};

export default Container;
