import { connect } from 'react-redux';
import  Entry from '../components/about_single.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.params;
    const { apiCalls } = state;
    const entries = apiCalls['about/entry'] || {
        isFetching: true,
        items: []
    };

    let entry = {
        id: 0,
        name: 'not',
        text: 'not'
    };
    var i = 0;
    for(i; i < entries.items.length; i++){
        if (entries.items[i].id === parseInt(id)){
            entry = entries.items[i];
            break;
        }
    }
    const isFetching = entries.isFetching;
    return {
        isFetching: isFetching,
        entry: entry
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.params;
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const EntryV = connect(
    mapStateToProps,
    mapDispatchToProps
)(Entry);

export default EntryV;
