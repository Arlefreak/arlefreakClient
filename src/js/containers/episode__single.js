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

    const podcasts = apiCalls['podcast/json/podcast'] || {
        isFetching: true,
        items: []
    };

    let podcast = {
        title: '',
        slug: '',
        text: '',
        image: '',
    };

    let item = {
        id: 0,
        title: 'Loading',
        slug: '',
        text: 'Loading',
    };


    var i = 0;
    if(podcasts.items.length > 0) {
        for(i; i < podcasts.items.length; i++){
            if (podcasts.items[i].slug === slug){
                podcast = podcasts.items[i];
                break;
            }
        }
    }

    let iTunesURL = podcast.iTunesURL || null;
    let feed = podcast.feed || '';

    let prev;
    let next;
    i = 0;

    if(items.length > 0) {
        for(i; i < items.length; i++){
            if (items[i].slug === episode_slug){
                item = items[i];
                if(i > 0)
                    prev = items[i-1].slug;
                if(i < items.length -1)
                    next = items[i+1].slug;
                break;
            }
        }
    }

    const meta_title = item.title;
    const meta_description = item.small_text;
    const meta_preview = item.image;

    return {
        id: 'btp',
        title: item.title,
        isFetching,
        item: item,

        slug: slug,
        feed: feed,
        iTunesURL: iTunesURL,
        next: next,
        prev: prev,

        meta_title,
        meta_description,
        meta_preview,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { slug, episode_slug} = ownProps.match.params;
    dispatch(apiFetchIfNeeded('podcast/json/episodes/' + slug ));
    dispatch(apiFetchIfNeeded('podcast/json/podcast'));
    return {};
};

const EpisodeSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default EpisodeSingle;
