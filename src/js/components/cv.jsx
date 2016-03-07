import React, { PropTypes } from 'react';
import Remarkable from 'remarkable';
import Loading from './loading.jsx';

const CV = ({ file, isFetching }) => {
    var md = new Remarkable();
    var mdr = md.render(file);
    if(!isFetching){
        return (
            <div  className='cv' dangerouslySetInnerHTML={{ __html: mdr }}/>
        );
    }else{
        return (
            <Loading/>
        );
    }
};

CV.propTypes = {
    file: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default CV;
