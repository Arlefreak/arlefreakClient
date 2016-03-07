import { connect } from 'react-redux';
import  Diary from '../components/diarySingle.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.params;
    const { apiCalls } = state;
    const posts = apiCalls['posts'] || {
        isFetching: true,
        items: []
    };

    let post = {
        id: 0,
        title: 'not',
        text: 'not'
    };
    var i = 0;
    for(i; i < posts.items.length; i++){
        if (posts.items[i].id === parseInt(id)){
            post = posts.items[i];
            break;
        }
    }
    const isFetching = posts.isFetching;
    return {
        isFetching: isFetching,
        post: post
    };
};

const DiaryV = connect(
    mapStateToProps
)(Diary);

export default DiaryV;
