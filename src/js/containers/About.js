import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions/actions';
import  About from '../components/about.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { fileCalls } = state;
    const about = fileCalls['https://raw.githubusercontent.com/Arlefreak/Resume/master/About.md'] || {
        isFetching: true,
        file: ''
    };
    const site = fileCalls['https://raw.githubusercontent.com/Arlefreak/arlefreakClient/master/README.md'] || {
        isFetching: true,
        file: ''
    };

    const isFetching = about.isFetching && site.isFetching;

    return {
        about: about.file,
        site: site.file,
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/About.md'));
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/arlefreakClient/master/README.md'));
    return {};
};

const AboutV = connect(
    mapStateToProps,
    mapDispatchToProps
)(About);

export default AboutV;
