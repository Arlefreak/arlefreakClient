import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions/actions';
import  About from '../components/about.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { fileCalls } = state;
    const {
        isFetching,
        lastUpdated,
        file: file
    } = fileCalls['https://raw.githubusercontent.com/Arlefreak/Resume/master/About.md'] || {
        isFetching: true,
        file: ''
    };

    return {
        about: file,
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/About.md'));
    return {};
};

const AboutV = connect(
    mapStateToProps,
    mapDispatchToProps
)(About);

export default AboutV;
