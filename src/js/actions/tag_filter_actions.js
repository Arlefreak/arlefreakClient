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

export function filterByTags (projects, tags) {
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
