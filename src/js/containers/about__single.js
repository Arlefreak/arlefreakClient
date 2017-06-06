import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { slug } = ownProps.match.params;
    const { apiCalls } = state;
    const list = apiCalls['about/entry'] || {
        isFetching: true,
        items: []
    };

    let item = {
        slug: 0,
        name: 'Loading',
        text: 'Loading'
    };

    var i = 0;
    for(i; i < list.items.length; i++){
        if (list.items[i].slug === slug){
            item = list.items[i];
            break;
        }
    }

    const isFetching = list.isFetching;

    const meta_description = item.text;

    return {
        id: 'about',
        title: item.name,
        meta_description: meta_description,
        isFetching,
        item: item,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const AboutSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default AboutSingle;
