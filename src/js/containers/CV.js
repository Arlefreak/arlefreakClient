import { connect } from 'react-redux';
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

    console.log(fileCalls);
    console.log(file);
    
    return {
        file: file,
        isFetching
    };
};

const cv = connect(
    mapStateToProps
)(CV);

export default cv;
