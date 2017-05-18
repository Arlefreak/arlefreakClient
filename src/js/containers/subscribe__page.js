import { connect } from 'react-redux';
import SubscribePage from '../components/subscribe__page.jsx';

const mapStateToProps = (state) => {
    return {
        id: 'h',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscribePage);

export default Home;
