import { connect } from 'react-redux';
import PortfolioV from '../components/portfolio.jsx';
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state) => {
    const { apiCalls } = state;
    const {
        isFetching
    } = apiCalls['portfolio/projects'] || {
        isFetching: true
    };
    return {
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages/?imgType=mni'));
    return {};
};

const Portfolio = connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfolioV);

export default Portfolio;
