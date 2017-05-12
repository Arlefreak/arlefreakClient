import fetch from 'isomorphic-fetch';
import constants from '../constants.js';
const apiURL = constants.APIURL;
import ReactGA from 'react-ga';
ReactGA.initialize('UA-43222844-13');

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

export function filterByCategory (projects, category) {
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

