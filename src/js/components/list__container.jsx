import PropTypes from 'prop-types';
import React from 'react';
import Remarkable from 'remarkable';

import Page from '../containers/page.js';
import List from './list.jsx';

import CategoryList from '../containers/project__filter__categories.js';
import TagList from '../containers/project__filter__tags.js';
import ImageList from '../containers/project__images__list.js';

const Container = ({
    id,
    title,
    isFetching,
    items,
    categories,
    tags,
    description,
    images,
    route,

    meta_url,
    meta_title,
    meta_description,
    meta_preview,
}) => {
    var listClasses = !images ? 'full-width' : '';
    var md = new Remarkable();
    var text = description || '';
    var mdr = md.render(text);

    return (
        <Page 
            id = { id }
            title = { title }
            isFetching = { isFetching }

            meta_url = { meta_url }
            meta_title = { meta_title }
            meta_description = { meta_description }
            meta_preview = { meta_preview }
        >
            { categories != null && <CategoryList categories={ categories } className="categories" all={ true }/> }
            { tags != null && <TagList tags={ tags } className="tags" all={ true }/> }
            { description != null && <div className="markdown no-margin" dangerouslySetInnerHTML={{ __html: mdr }}/> }
            { description != null && <div className="margin"></div> }
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
    tags: PropTypes.shape(),
    images: PropTypes.shape(),
    description: PropTypes.string,
    route: PropTypes.string.isRequired,

    meta_description: PropTypes.string,
    meta_url: PropTypes.string,
    meta_title: PropTypes.string,
    meta_preview: PropTypes.string,
};

export default Container;
