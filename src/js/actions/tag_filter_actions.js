import fetch from 'isomorphic-fetch';
import constants from '../constants.js';
const apiURL = constants.APIURL;
// import ReactGA from 'react-ga';
// ReactGA.initialize('UA-43222844-13');

export const ADD_TAG_FILTER = 'ADD_TAG_FILTER';
export const DELETE_TAG_FILTER = 'DELETE_TAG_FILTER';
export const CLEAR_ALL_TAG_FILTERS = 'CLEAR_ALL_TAG_FILTERS';

export function addTagFilter(tag_id, tag) {
    // ReactGA.event({
    //     category: 'Filter',
    //     action: 'addTagFilter',
    //     value: tag_id,
    //     label: tag,
    // });
    return { 
        type: ADD_TAG_FILTER,
        tag_id,
        tag
    };
}

export function deleteTagFilter(tag_id) {
    // ReactGA.event({
    //     category: 'Filter',
    //     action: 'deleteTagFilter',
    //     value: tag_id,
    //     label: tag,
    // });
    return {
        type: DELETE_TAG_FILTER,
        tag_id
    };
}

export function clearTagFilter() {
    // ReactGA.event({
    //     category: 'Filter',
    //     action: 'clearTagFilter'
    // });
    return {
        type: CLEAR_ALL_TAG_FILTERS
    };
}

export function filterByTags (items, tags) {
    if(!items || !tags) return [];
    if(items.length < 1 || tags.length < 1) return [];

    // Return a list of filtered objects that have a tag that matches one of the tags filter array
    return items.filter((item) => {
        return item.tags.some((item_tag) => {
            return tags.some((tags_tag) => {
                return ( item_tag.tag_id === tags_tag.tag_id );
            });
        });
    });
};
