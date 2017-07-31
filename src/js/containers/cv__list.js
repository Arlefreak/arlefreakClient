import { connect } from 'react-redux';
import ListCointainer from '../components/list__container.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleItems, tagFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['cv/cv'] || {
        isFetching: true,
        items: []
    };

    let finalFetch = isFetching;

    const meta_title = 'Mario Carballo Zama';

    return {
        id: 'cv',
        items: items,
        route: 'cv',
        isFetching,
        meta_title,
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('cv/cv'));
    return {};
};

const cvPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default cvPage;
