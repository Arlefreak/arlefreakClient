import React, { PropTypes } from 'react';
import Page from './page.jsx';
import List from './list.jsx';

const Container = ({ id, title, isFetching, items, route }) => {
    return (
    <Page 
        id = { id }
        title = { title }
        isFetching = { isFetching }
    >
        <List items={ items} route={ route } />
    </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        title: PropTypes.string
    }).isRequired).isRequired,
    route: PropTypes.string.isRequired
};

export default Container;
