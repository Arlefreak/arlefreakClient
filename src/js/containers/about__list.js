import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions';
import ListCointainer from '../components/list__container.jsx';

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
        id: 'a',
        isFetching,
        items: items,
        route: 'about'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('about/entry'));
    return {};
};

const aboutPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default aboutPage;
