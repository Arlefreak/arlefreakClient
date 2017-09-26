import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import ListCointainer from '../components/city__list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls } = state;

    const cities = apiCalls['nomad/city'] || {
        isFetching: true,
        items: []
    };

    const trips = apiCalls['nomad/trip'] || {
        isFetching: true,
        items: []
    };

    const meta_title = 'Nomad';

    return {
        id: 'nomad',
        isFetching: cities.isFetching || trips.isFetching,
        items: cities.items,
        trips: trips.items,
        meta_title,
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('nomad/trip'));
    dispatch(apiFetchIfNeeded('nomad/city'));
    return {};
};

const CityList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default CityList;
