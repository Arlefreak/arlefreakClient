import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Page from './page.jsx';
import Soon from './soon.jsx';
import ImageList from '../containers/project__images__list.js';
import Remarkable from 'remarkable';

const Container = ({ id, title, meta_description, isFetching, items, images, config, route }) => {
    var md = new Remarkable();
    var text = config ? config.items.longDescription : '';
    var mdr = md.render(text);

    return (
        <Page 
            id = { id }
            title = { title }
            isFetching = { isFetching }
            meta_description = { meta_description }
        >
            <Soon></Soon>
            { config != null && <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }}/> }
            { images != null && <div className="margin"></div> }
            { images != null && <ImageList className="full-width" images={ images } items={ items }></ImageList> }
        </Page>
    );
};

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    meta_description: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        title: PropTypes.string
    }).isRequired).isRequired,
    images: PropTypes.PropTypes.shape(),
    config: PropTypes.PropTypes.shape(),
    route: PropTypes.string.isRequired
};

export default Container;
