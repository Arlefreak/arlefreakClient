import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
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

    const config = apiCalls['web_client/config/1/'] || {
        isFetching: true,
        items: {},
    };
    const meta_description = config.items.description || '';

    return {
        id: 'about',
        isFetching,
        items: items,
        meta_description: meta_description,
        route: 'about'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('web_client/config/1/'));
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const aboutPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default aboutPage;
