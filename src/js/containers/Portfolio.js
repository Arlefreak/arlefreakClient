import { connect } from 'react-redux';
import PortfolioV from '../components/portfolio.jsx';
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching
    } = apiCalls['projects'] || {
        isFetching: true
    };
    return {
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('projects'));
    dispatch(apiFetchIfNeeded('projectsImages'));
    return {};
};

const Portfolio = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfolioV);

export default Portfolio;
