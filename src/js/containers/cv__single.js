import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions';
import SingleContainer from '../components/single__container.jsx';;

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

    let item = {
        id: 0,
        text: ''
    };

    if (file != item.text ){
        item.text = file;
    }

    return {
        id: 'cv',
        isFetching,
        item: item,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(fileFetchIfNeeded('https://raw.githubusercontent.com/Arlefreak/Resume/master/README.md'));
    return {};
};

const CvSingle = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleContainer);

export default CvSingle;
