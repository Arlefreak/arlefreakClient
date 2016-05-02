import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import  About from '../components/about.jsx';;

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['about/entry'] || {
        isFetching: true,
        items: []
    };
    return {
        items,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('about/entry'));
    dispatch(apiFetchIfNeeded('about/entryImages'));
    return {};
};

const AboutV = connect(
    mapStateToProps,
    mapDispatchToProps
)(About);

export default AboutV;
