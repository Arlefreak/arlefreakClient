import React, { PropTypes } from 'react';
import Remarkable from 'remarkable';
import Loading from './loading.jsx';

const About = ({ about, site, isFetching }) => {
    var md = new Remarkable();
    var mdrAbout = md.render(about);
    var mdrSite = md.render(site);

    if(!isFetching){
        return (
            <article>
                <h2>About</h2>
                <div  className="markdown" dangerouslySetInnerHTML={{ __html: mdrAbout }}/>
                <div  className="markdown" dangerouslySetInnerHTML={{ __html: mdrSite }}/>
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
    site: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default About;
