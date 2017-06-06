import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Single from './single.jsx';
import Episode from './episode.jsx';
import TagList from '../containers/single_tags_list.js';
import LinkList from './link__list.jsx';
import ImageList from './gallery__list.jsx';

const Container = ({ id, title, meta_description, isFetching, item, images, links, tags }) => {
    return (
        <Page 
            id = { id }
            title = { title }
            isFetching = { isFetching }
            meta_description = { meta_description }
        >
            {
                links != null &&
                    <LinkList
                        links = { links }
                    ></LinkList>
            }
            <Episode 
                item={ item }
            />
        </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    meta_description: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape),
    images: PropTypes.arrayOf(PropTypes.shape),
    tags: PropTypes.arrayOf(PropTypes.shape),
};

export default Container;
