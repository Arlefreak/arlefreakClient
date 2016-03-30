import React, { PropTypes } from 'react';
import Remarkable from 'remarkable';
import Loading from './loading.jsx';

const About = ({ about, isFetching }) => {
    var md = new Remarkable();
    var mdr = md.render(about);
    if(!isFetching){
        return (
            <article>
                <h2>About</h2>
                <div  className="markdown" dangerouslySetInnerHTML={{ __html: mdr }}/>
                <img className="index" src="img/a.svg" alt="Icono"/>
            </article>
        );
    }else{
        return(
            <article>
                <Loading/>
            </article>
        );
    }
};

About.propTypes = {
    about: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default About;
