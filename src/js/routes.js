import { React } from 'react';
import { Redirect } from 'react-router-dom';

import Home from './containers/home';
import Subscribe from './containers/subscribe';

import AboutList from './containers/about/list';
import AboutSingle from './containers/about/single';

import DiaryList from './containers/diary/list';
import DiarySingle from './containers/diary/single';

import CvList from './containers/cv/list';
import CvSingle from './containers/cv/single';

import LigojList from './containers/ligo/list';

import ProjectList from './containers/portfolio/list';
import ProjectSingle from './containers/portfolio/single';

import PodcastList from './containers/podcast/list';
import EpisodeList from './containers/episode/list';
import EpisodeSingle from './containers/episode/single';

import CityList from './containers/city/list';

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
  singlePodcastAction,
  nomadAction,
} from './actions/pages_actions.js';

export const routes = [
  {
    path: '/projects',
    exact: true,
    //component: (props) => <Redirect to='/portfolio' />,
    component: ProjectList,
    loadData: () => projectsAction(),
  },
  {
    path: '/projects/:slug',
    exact: true,
    /* component: (props) => <Redirect to={`/portfolio/${props.match.params.slug }`} />, */
    component: ProjectSingle,
    loadData: params => projectSingleAction(params),
  },
  {
    path: '/portfolio',
    exact: true,
    component: ProjectList,
    loadData: () => projectsAction(),
  },
  {
    path: '/portfolio/:slug',
    exact: true,
    component: ProjectSingle,
    loadData: params => projectSingleAction(params),
  },
  {
    path: '/about',
    exact: true,
    component: AboutList,
    loadData: () => aboutAction(),
  },
  {
    path: '/about/:slug',
    exact: true,
    component: AboutSingle,
    loadData: () => aboutAction(),
  },
  {
    path: '/logs',
    exact: true,
    component: DiaryList,
    loadData: () => diaryAction(),
  },
  {
    path: '/logs/:slug',
    exact: true,
    component: DiarySingle,
    loadData: params => diaryAction(params),
  },
  {
    path: '/cv',
    exact: true,
    component: CvList,
    loadData: () => cvAction(),
  },
  {
    path: '/cv/:slug',
    exact: true,
    component: CvSingle,
    loadData: () => cvAction(),
  },
  {
    path: '/subscribe',
    exact: true,
    component: Subscribe,
    loadData: () => subscribeAction(),
  },
  {
    path: '/ligoj',
    exact: true,
    component: LigojList,
    loadData: () => ligojAction(),
  },
  {
    path: '/ligo',
    exact: true,
    component: LigojList,
    loadData: () => ligojAction(),
  },
  {
    path: '/podcasts',
    exact: true,
    component: PodcastList,
    loadData: () => podcastAction(),
  },
  {
    path: '/podcasts/:slug',
    exact: true,
    component: EpisodeList,
    loadData: params => singlePodcastAction(params),
  },
  {
    path: '/podcasts/:slug/:episode_slug',
    exact: true,
    component: EpisodeSingle,
    loadData: params => singlePodcastAction(params),
  },
  {
    path: '/nomad',
    exact: true,
    component: CityList,
    loadData: () => nomadAction(),
  },
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: () => homeAction(),
  },
];
