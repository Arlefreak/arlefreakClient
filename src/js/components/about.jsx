import React, { PropTypes } from 'react';
import Remarkable from 'remarkable';
import List from './about_list.jsx';
import Loading from './loading.jsx';

const About = ({ items, isFetching }) => {
    var md = new Remarkable();

    if(!isFetching){
        return (
            <article>
                <h2>About</h2>
                <List items={items} />
                <img className="index" src="/img/a.svg" alt="Icono"/>
            </article>
        );
    }else{
        return(
            <article>
                <Loading/>
                <img className="index" src="/img/a.svg" alt="Icono"/>
            </article>
        );
    }
};

About.propTypes = {
    items : PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default About;
