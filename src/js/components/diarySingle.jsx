import React, { PropTypes } from 'react';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const DiaryPost = ({ 
    isFetching,
    post,
}) => {
    var md = new Remarkable();
    var mdr = md.render(post.text);
    if(!isFetching){
        return(
            <article className="diary post">
                <section>
                    <h2>{ post.title }</h2>
                    <div>
                        <span className="date">{ post.dateCreated }</span>
                    </div>
                    <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }}/>
                </section>
                <img className="index" src="img/d.svg" alt="Icono"/>
            </article>
        );
    }else{
        return(
            <Loading/>
        );
    }
};

DiaryPost.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};
export default DiaryPost;
