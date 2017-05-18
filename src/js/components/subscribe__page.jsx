import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Subscribe from './subscribe.jsx';

const Container = ({ id, title }) => {

    return (
    <Page 
        id = { id }
        title = { title }
        isFetching = { false }
    >
        <Subscribe></Subscribe>
    </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
};

export default Container;
