import { connect } from 'react-redux';
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

const Diary = connect(
    mapStateToProps
)(DiaryList);

export default Diary;
