import { connect } from 'react-redux';
import HomePage from '../components/home.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleItems } = state;
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

    const config = apiCalls['web_client/config/1/'] || {
        isFetching: true,
        items: {},
    };

    const finalFetch = isFetching && images.isFetching;

    const meta_description = config.items.description || '';

    return {
        id: 'home',
        isFetching: finalFetch,
        items: items,
        images: images,
        config: config,
        meta_description: meta_description,
        route: ''
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('web_client/config/1/'));
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages/?imgType=mni'));
    return {};
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default Home;
