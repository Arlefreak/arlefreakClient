import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['diary/posts'] || {
        isFetching: true,
        items: []
    };

    return {
        id: 'd',
        isFetching,
        items: items,
        route: 'logs'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('diary/posts'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;
