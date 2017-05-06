import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
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

    const tags = apiCalls['ligoj/linkTags'] || {
        isFetching: true,
        items: []
    };

    return {
        id: 'ligoj',
        isFetching: isFetching && tags.isFetching,
        items: items,
        tags: tags,
        route: 'H'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('ligoj/link'));
    dispatch(apiFetchIfNeeded('ligoj/linkTags'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;
