import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['ligoj/link'] || {
        isFetching: true,
        items: []
    };

    return {
        id: 'h',
        isFetching,
        items: items,
        route: 'H'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('ligoj/link'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;
