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

    const meta_title = 'About';

    return {
        id: 'about',
        isFetching,
        items: items,
        route: 'about',
        meta_title,
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
