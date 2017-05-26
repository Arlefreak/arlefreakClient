import { connect } from 'react-redux';
import ListCointainer from '../components/list__container.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleItems, tagFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['podcast/json/podcast'] || {
        isFetching: true,
        items: []
    };

    const tags = apiCalls['podcast/json/podcastTags'] || {
        isFetching: true,
        items: []
    };

    let finalFetch = isFetching &&
        tags.isFetching;

    return {
        id: 'projects',
        isFetching: finalFetch,
        items: items,
        // tags: tags,
        route: 'podcasts'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('podcast/json/podcast'));
    dispatch(apiFetchIfNeeded('podcast/json/podcastTags'));
    return {};
};

const podcastPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default podcastPage;
