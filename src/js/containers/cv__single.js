import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import SingleContainer from '../components/single__container.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls } = state;

    const config = apiCalls['web_client/config/1/'] || {
        isFetching: true,
        items: {
            id: 0,
            cv: '',
        },
    };

    const meta_description = config.items.description || '';
    const meta_title = 'Mario Carballo Zama';
    const item = {
        id: 0,
        text: config.items.cv,
    };

    return {
        id: 'cv',
        title: 'Mario Carballo Zama',
        className: 'cv',
        isFetching: config.isFetching,
        item: item,
        meta_description,
        meta_title,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('web_client/config/1/'));
    return {};
};

const CvSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default CvSingle;
