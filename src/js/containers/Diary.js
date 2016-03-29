import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import DiaryList from '../components/diaryList.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['posts'] || {
        isFetching: true,
        items: []
    };

    return {
        posts: items,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('posts'));
    return {};
};

const Diary = connect(
    mapStateToProps,
    mapDispatchToProps
)(DiaryList);

export default Diary;
