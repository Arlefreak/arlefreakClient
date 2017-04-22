import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { apiCalls } = state;
    const list = apiCalls['diary/posts'] || {
        isFetching: true,
        items: []
    };

    let item = {
        id: 0,
        title: 'Loading',
        text: 'Loading'
    };

    var i = 0;
    for(i; i < list.items.length; i++){
        if (list.items[i].id === parseInt(id)){
            item = list.items[i];
            break;
        }
    }
    const isFetching = list.isFetching;

    return {
        id: 'd',
        title: item.title,
        isFetching,
        item: item,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.match.params;
    dispatch(apiFetchIfNeeded('diary/posts'));
    return {};
};

const DiarySingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default DiarySingle;
