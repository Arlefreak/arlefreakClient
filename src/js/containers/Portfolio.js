import { connect } from 'react-redux';
import PortfolioV from '../components/portfolio.jsx';

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

const Portfolio = connect(
    mapStateToProps
)(PortfolioV);

export default Portfolio;
