import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions/actions';
import  CV from '../components/cv.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { fileCalls } = state;
    const {
        isFetching,
        lastUpdated,
        file: file
    } = fileCalls['https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'] || {
        isFetching: true,
        file: ''
    };

    return {
        file: file,
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'));
    return {};
};

const cv = connect(
    mapStateToProps,
    mapDispatchToProps
)(CV);

export default cv;
