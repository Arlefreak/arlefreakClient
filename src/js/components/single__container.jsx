import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Single from './single.jsx';
import TagList from '../containers/single_tags_list.js';
import LinkList from './link__list.jsx';
import ImageList from './gallery__list.jsx';

const Container = ({ id, title, isFetching, item, images, links, tags }) => {
    return (
        <Page 
            id = { id }
            title = { title }
            isFetching = { isFetching }
        >
            {
                links != null &&
                    <LinkList
                        links = { links }
                    ></LinkList>
            }
            <Single 
                item={ item }
                links={ links }
                images= { images }
                tags = { tags }
            />
            {
                images != null &&
                    <ImageList
                        images = { images }
                    /> 
            }
            {
                tags != null &&
                    <div className="margin"></div>
            }
            {
                tags != null &&
                    <TagList
                        tags={ tags }
                        className="tags"
                        all={ false }
                    />
            }
        </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape),
    images: PropTypes.arrayOf(PropTypes.shape),
    tags: PropTypes.arrayOf(PropTypes.shape),
};

export default Container;
