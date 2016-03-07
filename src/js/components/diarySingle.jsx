import React, { PropTypes } from 'react';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const DiaryPost = ({ 
    isFetching,
    post,
}) => {
    var md = new Remarkable();
    console.log(post.text);
    var mdr = md.render(post.text);
    if(!isFetching){
        return(
            <article className="post">
                <section>
                    <h2>{ post.title } - { post.dateCreated }</h2>
                    <div dangerouslySetInnerHTML={{ __html: mdr }}/>
                </section>
                <img className="index" src="img/tumblr.svg" alt="Icono"/>
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
