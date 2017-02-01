import React, { PropTypes } from 'react';
import Page from './page.jsx';
import List from './list.jsx';
import CategoryList from '../containers/CategoryFilter.js';
import TagList from '../containers/TagFilter.js';
import ImageList from '../containers/Images.js';

const Container = ({ id, title, isFetching, items, categories, tags, images, route }) => {
    return (
    <Page 
        id = { id }
        title = { title }
        isFetching = { isFetching }
    >
        { categories != null && <CategoryList></CategoryList> }
        { tags != null && <TagList></TagList> }
        { images != null && <ImageList></ImageList> }
        <List items={ items } route={ route } />
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
    categories: PropTypes.arrayOf(PropTypes.shape()),
    tags: PropTypes.arrayOf(PropTypes.shape()),
    images: PropTypes.arrayOf(PropTypes.shape()),
    route: PropTypes.string.isRequired
};

export default Container;
