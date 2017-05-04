import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Soon from './soon.jsx';
import ImageList from '../containers/project__images__list.js';

const Container = ({ id, title, isFetching, items, images, route }) => {
    return (
    <Page 
        id = { id }
        title = { title }
        isFetching = { isFetching }
    >
        <Soon></Soon>
        { images != null && <ImageList className="full-width" images={ images } items={ items }></ImageList> }
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
    images: PropTypes.PropTypes.shape(),
    route: PropTypes.string.isRequired
};

export default Container;
