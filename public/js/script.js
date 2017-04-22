import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById('application'));

const APIURL = 'https://api.arlefreak.com/';
module.exports = {
    APIURL:APIURL
};

var i = 1;
console.log(i);

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
        value: name
    });
    return {
        type: SET_CATEGORY_FILTER,
        id,
        name
    };
}

export const ADD_TAG_FILTER = 'ADD_TAG_FILTER';
export const DELETE_TAG_FILTER = 'DELETE_TAG_FILTER';
export const CLEAR_ALL_TAG_FILTERS = 'CLEAR_ALL_TAG_FILTERS';

export function addTagFilter(id, tag) {
    ReactGA.event({
        category: 'Filter',
        action: 'addTagFilter',
        value: tag
    });
    return { 
        type: ADD_TAG_FILTER,
        id,
        tag
    };
}

export function deleteTagFilter(id) {
    ReactGA.event({
        category: 'Filter',
        action: 'deleteTagFilter',
        value: id
    });
    return {
        type: DELETE_TAG_FILTER,
        id
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

export const SET_VISIBLE_PROJECTS = 'SET_VISIBLE_PROJECTS';
export function setVisibleProjects(projects) {
    const PROJECTS = projects || [];
    return {
        type: SET_VISIBLE_PROJECTS,
        projects: projects
    };
}

export function filterProjects() {
    return function (dispatch, getState){
        const state = getState() || {};
        const apiCalls = state['apiCalls'] || [];
        const projects = apiCalls['portfolio/projects'] || {};
        const items = projects.items || [];
        const categoryFilter = state['categoryFilter'];
        const tagFilter = state['tagFilter'] || [];
        let filterProjects = filterByCategory(items, categoryFilter);
        filterProjects = filterByTags(filterProjects, tagFilter); dispatch(setVisibleProjects(filterProjects));
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
                    {/* console.log(project); */}
                    for(j; j < project.tags.length; j++){
                        var b = false;
                        k = 0;
                        for(k; k < tags.length; k++){
                            if(project.tags[j].id === tags[k].id){
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
import  CategoryRow from '../components/categoryRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const { category } = ownProps;
    let active = false;

    if(categoryFilter){
        if(categoryFilter.id === category.id){
            active = true;
        }
    }
    return {
        category,
        active
    };
};

const Category = connect(
    mapStateToProps
)(CategoryRow);

export default Category;

import { connect } from 'react-redux';
import { setCategoryFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import  CategoryList from '../components/categoryList.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: categories
    } = apiCalls['portfolio/projectsCategories'] || {
        isFetching: true,
        items: []
    };
    if(categories.length > 0 && categories[0].id !== 0 ){
        categories.unshift({
            id: 0,
            name:'All',
        });
    }
    return {
        categories: categories,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    return {
        onCategoryClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
            dispatch(filterProjects());
        }
    };
};

const CategoryFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList);

export default CategoryFilter;

import { connect } from 'react-redux';
import { clearTagFilter, filterProjects } from '../actions/actions';
import TagRow from '../components/clearAllTagsRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    let active = false;

    if(!tagFilter){
        active = true;
    }else if(tagFilter.length === 0){
        active = true;
    }
    return {
        active
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { tag } = ownProps;
    return {
        onClick: () => {
            dispatch(clearTagFilter());
            dispatch(filterProjects());
        }
    };
};

const Tag = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagRow);

export default Tag;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import  ImageList from '../components/imageList.jsx';;

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
    } = apiCalls['portfolio/projectsImages/?imgType=mni'] || {
        isFetching: true,
        items: []
    };
    
    const {
        items: projects
    } = apiCalls['portfolio/projects'] || {
        items: []
    };

    let filterProjects = visibleProjects;
    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = projects;
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
            // dispatch(setCategoryFilter(id, name));
            console.log('ImageClick: ' + id);
        }
    };
};

const Images = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageList);

export default Images;

import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions/actions';
import  Project from '../components/project.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.params;
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
    const { id } = ownProps.params;
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

import { connect } from 'react-redux';
import { addTagFilter, clearTagFilter, filterProjects } from '../actions/actions';
import TagRow from '../components/projectTagRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    const { tag } = ownProps;
    let active = false;

    if(tagFilter){
        var i = 0;
        for(i; i < tagFilter.length; i++){
            if(tagFilter[i].id === tag.id){
                active = true;
            }
        }
    }
    return {
        tag,
        active
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { tag } = ownProps;
    return {
        onClick: () => {
            dispatch(clearTagFilter());
            dispatch(addTagFilter(tag.id, tag.name));
            dispatch(filterProjects());
        }
    };
};

const Tag = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagRow);

export default Tag;

import { connect } from 'react-redux';
import { addTagFilter, deleteTagFilter, filterProjects } from '../actions/actions';
import TagRow from '../components/tagRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    const { tag } = ownProps;
    let active = false;

    if(tagFilter){
        var i = 0;
        for(i; i < tagFilter.length; i++){
            if(tagFilter[i].id === tag.tag_id){
                active = true;
            }
        }
    }
    return {
        tag,
        active
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { tag } = ownProps;
    return {
        onClick: () => {
            dispatch(addTagFilter(tag.tag_id, tag.tag));
            dispatch(filterProjects());
        }
    };
};

const Tag = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagRow);

export default Tag;

import { connect } from 'react-redux';
import  TagList from '../components/tagList.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: tags
    } = apiCalls['portfolio/projectTags'] || {
        isFetching: true,
        items: []
    };
    return {
        tags: tags,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onTagClick: (id, tag) => {
            dispatch(addTagFilter(id, tag));
        }
    };
};

const TagFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList);

export default TagFilter;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
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
import { apiFetchIfNeeded } from '../actions/actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.params;
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
    const { id } = ownProps.params;
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const AboutSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default AboutSingle;

import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions/actions';
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
    const { id } = ownProps.params;
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'));
    return {};
};

const CvSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default CvSingle;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
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
        route: 'diary'
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
import { apiFetchIfNeeded } from '../actions/actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.params;
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
    const { id } = ownProps.params;
    dispatch(apiFetchIfNeeded('diary/posts'));
    return {};
};

const DiarySingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default DiarySingle;

import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
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

    return {
        id: 'h',
        isFetching,
        items: items,
        route: 'H'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('ligoj/link'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;


import { connect } from 'react-redux';
import { setCategoryFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projectsCategories'] || {
        isFetching: true,
        items: []
    };

    if(items.length > 0 && items[0].id !== 0 ){
        items.unshift({
            id: 0,
            name:'Alll',
        });

        if(categoryFilter){
            items.map(( item ) => {
                if(categoryFilter.id === item.id){
                    item.active = true;
                }
            }
            );
        }
    }
    return {
        items: items,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    return {
        onClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
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
import { addTagFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projectTags'] || {
        isFetching: true,
        items: []
    };

    let itemsCopy = Object.assign([], items);

    if(itemsCopy.length > 0 && itemsCopy[0].id !== 0 ){
        itemsCopy.unshift({
            id: 0,
            name:'Alll',
        });
        itemsCopy.map(( item ) => {
            item.id = item.tag_id;
            item.name = item.tag;
            item.active = false;
            console.log(item);
        }
        );

        if(tagFilter){
            itemsCopy.map(( item ) => {
                tagFilter.map(( filter ) => {
                    if(filter.id === item.id){
                        item.active = true;
                    }
                });
            }
            );
        }
    }
    return {
        items: items,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onClick: (id, name) => {
            dispatch(addTagFilter(id, name));
        }
    };
};

const ProjectFilterTag = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterTag;

import { connect } from 'react-redux';
import ListCointainer from '../components/list__container.jsx';
import { apiFetchIfNeeded } from '../actions/actions';

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

    // TODO:  Grab categories & tags from state
    // const {
    //     isFetching,
    //     lastUpdated,
    //     items: items
    // } = apiCalls['portfolio/projectTags'] || {
    //     isFetching: true,
    //     items: []
    // };

    // const {
    //     isFetching,
    //     lastUpdated,
    //     items: items
    // } = apiCalls['portfolio/projectCategories'] || {
    //     isFetching: true,
    //     items: []
    // };

    let filterProjects = visibleProjects;
    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = items;
    }

    return {
        id: 'p',
        isFetching,
        items: filterProjects,
        categories: filterProjects,
        tags: filterProjects,
        images: filterProjects,
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

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { fetchPosts, addTagFilter, setCategoryFilter } from './actions/actions';
import portfolioApp from './reducers/reducers';

const loggerMiddleware = createLogger();

// const store = createStore(
//     applyMiddleware(
//         thunkMiddleware, // lets us dispatch() functions
//         loggerMiddleware // neat middleware that logs actions
//     ),
//     portfolioApp
// );

let store =  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)(portfolioApp);

store.dispatch(fetchPosts());
store.dispatch(addTagFilter(1, 'phaser'));
store.dispatch(setCategoryFilter(1, 'Games'));

import { combineReducers } from 'redux';
import { SET_VISIBLE_PROJECTS, FILE_REQUEST, FILE_RESPONSE, API_REQUEST, API_RESPONSE, SET_CATEGORY_FILTER, ADD_TAG_FILTER, DELETE_TAG_FILTER, CLEAR_ALL_TAG_FILTERS } from '../actions/actions';

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

const tagFilter = (state = [], action) => {
    var exists = false;
    var i = 0;
    var index = 0;
    switch (action.type) {
        case ADD_TAG_FILTER:
        case DELETE_TAG_FILTER:
            for(i; i < state.length; i++){
                if(state[i].id === action.id){
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
                    id: action.id,
                    tag: action.tag
                }
            ];
        case CLEAR_ALL_TAG_FILTERS:
            return [];
        default:
            return state;
    }
};

const visibleProjects = (state = [], action) => {
    switch (action.type){
        case SET_VISIBLE_PROJECTS:
            return action.projects;
            break;
        default:
            return state;
            break;
    }
};

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

const portfolioApp = combineReducers({
    tagFilter,
    apiCalls,
    fileCalls,
    categoryFilter,
    visibleProjects
});

export default portfolioApp;
