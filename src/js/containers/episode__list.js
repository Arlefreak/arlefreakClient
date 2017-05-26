import { connect } from 'react-redux';
import ListCointainer from '../components/list__container.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, visibleItems, tagFilter } = state;
    const { slug } = ownProps.match.params;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['podcast/json/episodes/' + slug ] || {
        isFetching: true,
        items: []
    };

    let finalFetch = isFetching;

    return {
        id: 'projects',
        isFetching: finalFetch,
        items: items,
        route: 'podcasts/' + slug,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { slug } = ownProps.match.params || '';
    dispatch(apiFetchIfNeeded('podcast/json/episodes/' + slug));
    return {};
};

const podcastPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default podcastPage;
