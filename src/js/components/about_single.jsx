import React, { PropTypes } from 'react';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const Entry = ({ 
    isFetching,
    entry,
}) => {
    var md = new Remarkable();
    var mdr = md.render(entry.text);
    if(!isFetching){
        return(
            <article className="diary post">
                <section>
                    <h2>{ entry.name }</h2>
                    <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }}/>
                </section>
                <img className="index" src="/img/a.svg" alt="Icono"/>
            </article>
        );
    }else{
        return(
            <Loading/>
        );
    }
};

Entry.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    entry: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};
export default Entry;
