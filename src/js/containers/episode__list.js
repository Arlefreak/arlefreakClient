import { connect } from 'react-redux';
import ListCointainer from '../components/episode__list__container.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, visibleItems, tagFilter } = state;
    const { slug } = ownProps.match.params;

    const podcasts = apiCalls['podcast/json/podcast'] || {
        isFetching: true,
        items: []
    };

    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['podcast/json/episodes/' + slug ] || {
        isFetching: true,
        items: []
    };

    var i = 0;
    let item = {
        title: '',
        text: '',
        image: '',
    };

    if(podcasts.items.length > 0) {
        for(i; i < podcasts.items.length; i++){
            if (podcasts.items[i].slug === slug){
                item = podcasts.items[i];
                break;
            }
        }
    }


    let finalFetch = isFetching && podcasts.isFetching;
    const meta_description = item.description || '';
    const meta_title  = item.title || '';
    const meta_preview  = item.image || '';

    return {
        id: 'btp',
        isFetching: finalFetch,
        item: item,
        items: items,
        route: 'podcasts/' + slug,

        meta_title,
        meta_description,
        meta_preview,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { slug } = ownProps.match.params || '';
    dispatch(apiFetchIfNeeded('podcast/json/podcast'));
    dispatch(apiFetchIfNeeded('podcast/json/episodes/' + slug));
    return {};
};

const podcastPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default podcastPage;
