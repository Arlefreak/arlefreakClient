import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Single from './single.jsx';

const Container = ({ id, title, isFetching, item }) => {
    return (
    <Page 
        id = { id }
        title = { title }
        isFetching = { isFetching }
    >
        <Single item={ item }/>
    </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired
};

export default Container;
