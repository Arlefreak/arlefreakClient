import { connect } from 'react-redux';
import SubscribePage from '../components/subscribe__page.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const config = apiCalls['web_client/config/'] || {
        isFetching: true,
        items: {},
    };


    return {
        id: 'rss',
        isFetching: config.isFetching,
        items: config.items,
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('web_client/config/'));
    return {};
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscribePage);

export default Home;
