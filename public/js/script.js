import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById('application'));

const APIURL = 'https://api.ellugar.co/';
module.exports = {
    APIURL:APIURL
};

import fetch from 'isomorphic-fetch';
import constants from '../constants.js';
const apiURL = constants.APIURL;

export const API_REQUEST = 'API_REQUEST';
function apiRequest(endPoint) {
    return {
        type: API_REQUEST,
        endPoint
    };
}

export const API_RESPONSE = 'API_RESPONSE';
export function apiResponse(json, endPoint) {
    return {
        type: API_RESPONSE,
        endPoint,
        projects: json,
        receivedAt: Date.now()
    };
}

export function apiFetch(endPoint) {
    return function (dispatch) {
        dispatch(apiRequest(endPoint));
        return fetch(apiURL + endPoint)
            .then(response => response.json())
            .then(json =>
                dispatch(apiResponse(json, endPoint))
            );
    };
}

export function apiFetchIfNeeded(endPoint){
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (apiShouldFetch(getState(), endPoint)) {
            // Dispatch a thunk from thunk!
            return dispatch(apiFetch(endPoint));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}

function apiShouldFetch(state, endPoint) {
    const apiCall = state.apiCalls[endPoint];
    if (!apiCall) {
        return true;
    } else if (apiCall.isFetching) {
        return false;
    } else {
        return false;
    }
}


import fetch from 'isomorphic-fetch';
import constants from '../constants.js';
const apiURL = constants.APIURL;
import ReactGA from 'react-ga';
ReactGA.initialize('UA-43222844-2');

export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export function setCategoryFilter(id, name) {
    ReactGA.event({
        category: 'Filter',
        action: 'setCategoryFilter',
        value: id,
        label: name,
    });
    return {
        type: SET_CATEGORY_FILTER,
        id,
        name
    };
}

function filterByCategory (projects, category) {
    if(projects.length > 0){
        if(category.id === 0){
            return projects;
        }else{
            return projects.filter(t => t.category === category.id);
        }
    }else{
        return projects;
    }
};


export const FILE_REQUEST  = 'FILE_REQUEST ';
function fileRequest(endPoint) {
    return {
        type: FILE_REQUEST ,
        endPoint
    };
}


export const FILE_RESPONSE = 'FILE_RESPONSE';
export function fileResponse(text, endPoint) {
    return {
        type: FILE_RESPONSE,
        endPoint,
        file: text,
        receivedAt: Date.now()
    };
}

export function fileFetch(endPoint) {
    return function (dispatch) {
        dispatch(fileRequest(endPoint));
        return fetch(endPoint)
            .then(response => response.text())
            .then(text =>
                dispatch(fileResponse(text, endPoint))
            );
    };
}

export function fileFetchIfNeeded(endPoint){
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.

    return (dispatch, getState) => {
        if (fileShouldFetch(getState(), endPoint)) {
            // Dispatch a thunk from thunk!
            return dispatch(fileFetch(endPoint));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}

function fileShouldFetch(state, endPoint) {
    const fileCall = state.fileCalls[endPoint];
    if (!fileCall) {
        return true;
    } else if (fileCall.isFetching) {
        return false;
    } else {
        return false;
    }
}


export * from './api_actions';
export * from './category_filter_actions';
export * from './file_actions';
export * from './api_actions';
export * from './tag_filter_actions';

import filterByCategory from './category_filter_actions.js';
import filterByTags from './tag_filter_actions.js';

export const SET_VISIBLE_ITEMS = 'SET_VISIBLE_ITEMS';
export function setVisibleItems(items) {
    const ITEMS = items || [];
    return {
        type: SET_VISIBLE_ITEMS,
        items: ITEMS
    };
}

export function filterItems() {
    return function (dispatch, getState){
        const state = getState() || {};
        const apiCalls = state['apiCalls'] || [];
        const current_object = apiCalls['portfolio/projects'] || {};
        const items = current_object.items || [];
        const categoryFilter = state['categoryFilter'];
        const tagFilter = state['tagFilter'] || [];

        let filteredItems = filterByCategory(items, categoryFilter);
        filteredItems = filterByTags(filteredItems, tagFilter);

        dispatch(setVisibleItems(filteredItems));
    };
}


import fetch from 'isomorphic-fetch';
import constants from '../constants.js';
const apiURL = constants.APIURL;
import ReactGA from 'react-ga';
ReactGA.initialize('UA-43222844-2');

export const ADD_TAG_FILTER = 'ADD_TAG_FILTER';
export const DELETE_TAG_FILTER = 'DELETE_TAG_FILTER';
export const CLEAR_ALL_TAG_FILTERS = 'CLEAR_ALL_TAG_FILTERS';

export function addTagFilter(tag_id, tag) {
    ReactGA.event({
        category: 'Filter',
        action: 'addTagFilter',
        value: tag_id,
        label: tag,
    });
    return { 
        type: ADD_TAG_FILTER,
        tag_id,
        tag
    };
}

export function deleteTagFilter(tag_id) {
    ReactGA.event({
        category: 'Filter',
        action: 'deleteTagFilter',
        value: tag_id,
        label: tag,
    });
    return {
        type: DELETE_TAG_FILTER,
        tag_id
    };
}

export function clearTagFilter() {
    ReactGA.event({
        category: 'Filter',
        action: 'clearTagFilter'
    });
    return {
        type: CLEAR_ALL_TAG_FILTERS
    };
}

function filterByTags (projects, tags) {
    var filteredProjects = [];
    var i = 0;
    var j = 0;
    var k = 0;
    var project;
    if(projects && tags){
        if(projects.length > 0 && tags.length > 0){
            for(i; i < projects.length; i++){
                project = projects[i];
                j = 0;
                if(project){
                    for(j; j < project.tags.length; j++){
                        var b = false;
                        k = 0;
                        for(k; k < tags.length; k++){
                            if(project.tags[j].id === tags[k].tag_id){
                                filteredProjects.push(project);
                                b = true;
                                break;
                            }
                        }
                        if(b){
                            break;
                        }
                    }
                }
            }
        }else{
            filteredProjects = projects;
        }
    }else{
        filteredProjects = projects;
    }
    return filteredProjects;
};

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['about/entry'] || {
        isFetching: true,
        items: []
    };

    return {
        id: 'a',
        isFetching,
        items: items,
        route: 'about'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const aboutPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default aboutPage;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { apiCalls } = state;
    const list = apiCalls['about/entry'] || {
        isFetching: true,
        items: []
    };

    let item = {
        id: 0,
        name: 'Loading',
        text: 'Loading'
    };

    var i = 0;
    for(i; i < list.items.length; i++){
        if (list.items[i].id === parseInt(id)){
            item = list.items[i];
            break;
        }
    }
    const isFetching = list.isFetching;

    return {
        id: 'a',
        title: item.name,
        isFetching,
        item: item,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.match.params;
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const AboutSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default AboutSingle;

import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { fileCalls } = state;
    const {
        isFetching,
        lastUpdated,
        file: file
    } = fileCalls['https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'] || {
        isFetching: true,
        file: ''
    };

    let item = {
        id: 0,
        text: ''
    };

    if (file != item.text ){
        item.text = file;
    }

    return {
        id: 'cv',
        isFetching,
        item: item,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'));
    return {};
};

const CvSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default CvSingle;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['diary/posts'] || {
        isFetching: true,
        items: []
    };

    return {
        id: 'd',
        isFetching,
        items: items,
        route: 'logs'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('diary/posts'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { apiCalls } = state;
    const list = apiCalls['diary/posts'] || {
        isFetching: true,
        items: []
    };

    let item = {
        id: 0,
        title: 'Loading',
        text: 'Loading'
    };

    var i = 0;
    for(i; i < list.items.length; i++){
        if (list.items[i].id === parseInt(id)){
            item = list.items[i];
            break;
        }
    }
    const isFetching = list.isFetching;

    return {
        id: 'd',
        title: item.title,
        isFetching,
        item: item,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.match.params;
    dispatch(apiFetchIfNeeded('diary/posts'));
    return {};
};

const DiarySingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default DiarySingle;

import { connect } from 'react-redux';
import HomePage from '../components/home.jsx';
import { apiFetchIfNeeded } from '../actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleProjects } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projects'] || {
        isFetching: true,
        items: []
    };

    const images = apiCalls['portfolio/projectsImages/?imgType=mni'] || {
        isFetching: true,
        items: []
    };

    let finalFetch = isFetching && images.isFetching;

    return {
        id: 'h',
        isFetching: finalFetch,
        items: items,
        images: images,
        route: ''
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages/?imgType=mni'));
    return {};
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default Home;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['ligoj/link'] || {
        isFetching: true,
        items: []
    };

    const tags = apiCalls['ligoj/linkTags'] || {
        isFetching: true,
        items: []
    };

    return {
        id: 'ligoj',
        isFetching: isFetching && tags.isFetching,
        items: items,
        tags: tags,
        route: 'H'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('ligoj/link'));
    dispatch(apiFetchIfNeeded('ligoj/linkTags'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;


import { connect } from 'react-redux';
import { setCategoryFilter, filterProjects, apiFetchIfNeeded } from '../actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = ownProps.categories || {
        isFetching: true,
        items: []
    };

    let active = [];
    active.length = 0;

    let allActive = categoryFilter.id === 0;

    if(items.length > 0 && items[0].id !== 0 ){
        if(categoryFilter) {
            items.map((item) => {
                if(categoryFilter.id === item.id){
                    active.push(true);
                }else{
                    active.push(false);
                }
            });
        }
    }

    return {
        items: items,
        isFetching,
        lastUpdated,
        active,
        allActive,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    return {
        onClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
            dispatch(filterProjects());
        },
        clearAll: () =>{
            dispatch(setCategoryFilter(0, 'All'));
            dispatch(filterProjects());
        }
    };
};

const ProjectFilterCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterCategory;

import { connect } from 'react-redux';
import { addTagFilter, filterProjects, apiFetchIfNeeded, clearTagFilter } from '../actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;

    const {
        isFetching,
        lastUpdated,
        items: items
    } = ownProps.tags || {
        isFetching: true,
        items: []
    };

    let active = [];
    let activeObjs = [];

    activeObjs.length = 0;
    active.length = 0;

    let allActive = tagFilter.length <= 0 ? true : false;

    if(items.length > 0){
        for(var i = 0; i < items.length; i++){
            let tag = {
                tag_id: items[i].tag_id,
                active: false,
            };
            for(var j = 0; j < tagFilter.length; j++){
                if(items[i].tag_id === tagFilter[j].tag_id)
                {
                    tag.active = true;
                    continue;
                }
            }
            active.push(tag.active);
            activeObjs.push(tag);
        }
    }

    return {
        items: items,
        isFetching,
        lastUpdated,
        active,
        allActive,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onClick: (tag_id, name) => {
            dispatch(addTagFilter(tag_id, name));
            dispatch(filterProjects());
        },

        clearAll: () =>{
            dispatch(clearTagFilter());
            dispatch(filterProjects());
        }
    };
};

const ProjectFilterTag = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterTag;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import  ImageList from '../components/image__list.jsx';;

const getVisibleImages  = (items, projects) => {
    if(items.length > 0){
        var i = 0;
        var j = 0;
        var filteredImages = [];
        for(i; i < items.length; i++){
            j = 0;
            for(j; j < projects.length; j++){
                if(items[i].project === projects[j].id ){
                    filteredImages.push(items[i]);
                }
            } 
        }
        return filteredImages;
    }else{
        return items;
    }
};

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, visibleProjects, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = ownProps.images || {
        isFetching: true,
        items: []
    };

    const _list = ownProps.items || [];

    let filterProjects = visibleProjects;
    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = _list;
    }

    const filteredImages = getVisibleImages(items, filterProjects);

    return {
        images: filteredImages,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onImageClick: (id, name) => {
        }
    };
};

const Images = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageList);

export default Images;

import { connect } from 'react-redux';
import ListCointainer from '../components/list__container.jsx';
import { apiFetchIfNeeded } from '../actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleProjects, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projects'] || {
        isFetching: true,
        items: []
    };

    const tags = apiCalls['portfolio/projectTags'] || {
        isFetching: true,
        items: []
    };

    const categories = apiCalls['portfolio/projectsCategories'] || {
        isFetching: true,
        items: []
    };

    const images = apiCalls['portfolio/projectsImages/?imgType=mni'] || {
        isFetching: true,
        items: []
    };

    let filterProjects = visibleProjects;

    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = items;
    }

    let finalFetch = isFetching &&
        tags.isFetching &&
        categories.isFetching &&
        images.isFetching;

    return {
        id: 'p',
        isFetching: finalFetch,
        items: filterProjects,
        categories: categories,
        tags: tags,
        images: images,
        route: 'projects'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages/?imgType=mni'));
    return {};
};

const projectsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default projectsPage;

import { connect } from 'react-redux';
import { setCategoryFilter, apiFetchIfNeeded} from '../actions';
import  Project from '../components/project.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    console.table(ownProps.match);
    const { apiCalls } = state;
    const projects = apiCalls['portfolio/projects'] || {
        isFetching: true,
        items: []
    };

    let project = {
        id: 0,
        name: '',
        description: '',
        tags: []
    };
    var i = 0;
    for(i; i < projects.items.length; i++){
        if (projects.items[i].id === parseInt(id)){
            project = projects.items[i];
            break;
        }
    }
    const links = apiCalls['portfolio/projectsLinks/?project__id=' + id] || {
        isFetching: true,
        items: []
    };
    const images = apiCalls['portfolio/projectsImages?imgType=gal&project__id=' + id] || {
        isFetching: true,
        items: []
    };
    const isFetching = projects.isFetching && images.isFetching && links.isFetching;
    return {
        isFetching: isFetching,
        project: project,
        links: links,
        images: images
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.match.params || 0;
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectsLinks/?project__id=' + id));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages?imgType=gal&project__id=' + id));
    return {
        onTagClick: (id) => { console.log(id); },
        onImageClick : () => { console.log('ImageClick'); }
    };
};

const ProjectV = connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);

export default ProjectV;

import { API_REQUEST, API_RESPONSE} from '../actions';

function apiCalls(state = {}, action) {
    switch (action.type) {
        case API_RESPONSE:
            return Object.assign({}, state, {
                [action.endPoint]: items(state[action.endPoint], action)
            });
        default:
            return state;
    }
};

const items = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case API_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case API_RESPONSE:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.projects,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

import { SET_CATEGORY_FILTER } from '../actions';

const categoryFilter = (state = {
    id: 0,
    name: 'All'
}, action) => {
    switch (action.type) {
        case SET_CATEGORY_FILTER:
            return {
                id: action.id,
                name: action.name
            };
        default:
            return state;
    }
};

import { FILE_REQUEST, FILE_RESPONSE } from '../actions';

function fileCalls(state = {}, action) {
    switch (action.type) {
        case FILE_RESPONSE:
            return Object.assign({}, state, {
                [action.endPoint]: file(state[action.endPoint], action)
            });
        default:
            return state;
    }
};

const file = (state = {
    isFetching: false,
    file: ''
}, action) => {
    switch (action.type) {
        case FILE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FILE_RESPONSE:
            return Object.assign({}, state, {
                isFetching: false,
                file: action.file,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

export * from './api_reducers.js';
export * from './file_reducers.js';
export * from './visible_items_reducers.js';
export * from './category_filter_reducers.js';
export * from './tag_filter_reducers.js';

import { ADD_TAG_FILTER, DELETE_TAG_FILTER, CLEAR_ALL_TAG_FILTERS } from '../actions';

const tagFilter = (state = [], action) => {

    var exists = false;
    var i = 0;
    var index = 0;

    switch (action.type) {
        case ADD_TAG_FILTER:
        case DELETE_TAG_FILTER:
            for(i; i < state.length; i++){
                if(state[i].tag_id === action.tag_id){
                    exists = true;
                    index = i;
                    break;
                }
            }
            if(exists){
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return [
                ...state,{
                    tag_id: action.tag_id,
                    tag: action.tag
                }
            ];
        case CLEAR_ALL_TAG_FILTERS:
            return [];
        default:
            return state;
    }
};

import { SET_VISIBLE_ITEMS } from '../actions';

const visibleItems = (state = [], action) => {
    switch (action.type){
        case SET_VISIBLE_ITEMS:
            return action.projects;
            break;
        default:
            return state;
            break;
    }
};
