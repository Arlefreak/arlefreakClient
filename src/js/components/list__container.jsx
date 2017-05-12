import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import List from './list.jsx';

import CategoryList from '../containers/project__filter__categories.js';
import TagList from '../containers/project__filter__tags.js';
import ImageList from '../containers/project__images__list.js';

const Container = ({ id, title, isFetching, items, categories, tags, images, route }) => {
    var listClasses = !images ? 'full-width' : '';
    return (
    <Page 
        id = { id }
        title = { title }
        isFetching = { isFetching }
    >
        { categories != null && <CategoryList categories={ categories } className="categories" all={ true }/> }
        { tags != null && <TagList tags={ tags } className="tags" all={ true }/> }
        { images != null && <ImageList images={ images } items={ items } className="half-width"></ImageList> }
        <List items={ items } route={ route }  className={ listClasses } />
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
    categories: PropTypes.shape(),
    tags: PropTypes.PropTypes.shape(),
    images: PropTypes.PropTypes.shape(),
    route: PropTypes.string.isRequired
};

export default Container;
