// import { createStore, combineReducers } from 'redux';
// var $ = window.$;
import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list.jsx';
import Loading from './components/loading.jsx';

const apiURL = 'http://api.arlefreak.com/';

class ArlefreakApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      projects: [],
      categories: []
    };
  }

  componentWillMount() {
    fetch(apiURL + 'projects')
    .then((response) => {
      console.log("Response:");
      return response.json();
    })
    .then((projects) => {
      console.log("Projects:");
      this.setState({ projects: projects });
    });

    fetch(apiURL+'projectsCategories')
    .then((response) => {
      console.log("Response:");
      return response.json();
    })
    .then((categories) => {
      console.log("Projects:");
      this.setState({ categories: categories });
    });
  }

  render() {
    if (this.state.projects.length > 0) {
      console.log(this.state.projects);
      return React.createElement(List, Object.assign({}, this.props, { 
        list: this.state.projects,
        nav: this.state.categories
      }));
    } else {
      return React.createElement(Loading);
    }
  }

}
var app = React.createElement(ArlefreakApp);
ReactDOM.render(app, document.getElementById('application'));

var i = 1;
console.log(i);
