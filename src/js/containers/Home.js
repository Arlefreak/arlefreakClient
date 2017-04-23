import { connect } from 'react-redux';
import HomePage from '../components/home.jsx';
import { apiFetchIfNeeded } from '../actions/actions';

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
