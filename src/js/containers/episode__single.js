import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import SingleContainer from '../components/single__episode__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { slug, episode_slug} = ownProps.match.params;
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['podcast/json/episodes/' + slug ] || {
        isFetching: true,
        items: []
    };

    let item = {
        id: 0,
        title: 'Loading',
        text: 'Loading',
        image: 'Loading',
    };

    var i = 0;
    if(items.length > 0) {
        for(i; i < items.length; i++){
            if (items[i].slug === episode_slug){
                item = items[i];
                break;
            }
        }
    }

    const meta_title = item.title;
    const meta_description = item.text;
    const meta_preview = item.image;

    return {
        id: 'btp',
        title: item.title,
        isFetching,
        item: item,

        meta_title,
        meta_description,
        meta_preview,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { slug, episode_slug} = ownProps.match.params;
    dispatch(apiFetchIfNeeded('podcast/json/episodes/' + slug ));
    return {};
};

const EpisodeSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default EpisodeSingle;
