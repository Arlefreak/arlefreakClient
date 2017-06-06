import { connect } from 'react-redux';
import { fileFetchIfNeeded } from '../actions/file_actions';
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

    meta_title = 'CV';

    return {
        id: 'cv',
        meta_description: meta_description,
        isFetching,
        item: item,
        meta_title,
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
