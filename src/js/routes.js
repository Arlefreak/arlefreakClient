import Home from './containers/home__page.js';
import Subscribe from './containers/subscribe__page.js';

import AboutList from './containers/about__list.js';
import AboutSingle from './containers/about__single.js';

import DiaryList from './containers/diary__list.js';
import DiarySingle from './containers/diary__single.js';

import CvSingle from './containers/cv__single.js';

import LigojList from './containers/ligoj__list.js';

import ProjectList from './containers/project__list.js';
import ProjectSingle from './containers/project__single.js';

import PodcastList from './containers/podcast__list.js';
import EpisodeList from './containers/episode__list.js';
import EpisodeSingle from './containers/episode__single.js';

import {
    homeAction,
    projectsAction,
    projectSingleAction,
    aboutAction,
    diaryAction,
    cvAction,
    subscribeAction,
    ligojAction,
    podcastAction,
} from './actions/pages_actions.js';

export const routes = [
    { 
        path: '/projects',
        exact: true,
        component: ProjectList,
        loadData: () => projectsAction(),
    },{
        path: '/projects/:slug',
        exact: true,
        component: ProjectSingle,
        loadData: (slug) => projectSingleAction(slug),
    },{
        path: '/about',
        exact: true,
        component: AboutList,
        loadData: () => aboutAction(),
    },{
        path: '/about/:slug',
        exact: true,
        component: AboutSingle,
        loadData: () => aboutAction(),
    },{
        path: '/logs',
        exact: true,
        component: DiaryList,
        loadData: () => diaryAction(),
    },{
        path: '/logs/:slug',
        exact: true,
        component: DiarySingle,
        loadData: () => diaryAction(),
    },{
        path: '/cv',
        exact: true,
        component: CvSingle,
        loadData: () => cvAction(),
    },{
        path: '/subscribe',
        exact: true,
        component: Subscribe,
        loadData: () => subscribeAction(),
    },{
        path: '/ligoj',
        exact: true,
        component: LigojList,
        loadData: () => ligojAction(),
    },{
        path: '/podcasts',
        exact: true,
        component: PodcastList,
        loadData: () => podcastAction(),
    },{
        path: '/podcasts/:slug',
        exact: true,
        component: EpisodeList,
        loadData: () => podcastAction(),
    },{
        path: '/podcasts/:slug/:episode_slug',
        exact: true,
        component: EpisodeSingle,
        loadData: () => podcastAction(),
    },{
        path: '/',
        exact: true,
        component: Home,
        loadData: () => homeAction(),
    }
];
