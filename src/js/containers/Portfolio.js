import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import PortfolioV from '../components/portfolio.jsx';

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const Portfolio = connect(
    mapStateToProps
)(PortfolioV);

export default Portfolio;
