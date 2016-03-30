import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions/actions';
import  About from '../components/about.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { fileCalls } = state;
    const {
        isFetchingAbout,
        file: about
    } = fileCalls['https://raw.githubusercontent.com/Arlefreak/Resume/master/About.md'] || {
        isFetchingAbout: true,
        about: ''
    };

    const {
        isFetchingSite,
        file: site
    } = fileCalls['https://raw.githubusercontent.com/Arlefreak/arlefreakClient/master/README.md'] || {
        isFetchingSite: true,
        site: ''
    };

    const isFetching = isFetchingAbout && isFetchingSite;

    return {
        about: about,
        site: site,
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
