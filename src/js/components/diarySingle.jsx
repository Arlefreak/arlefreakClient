import React, { PropTypes } from 'react';
import Loading from './loading.jsx';

const DiaryPost = ({ 
    isFetching,
    post,
}) => (
<article className="post">
    { isFetching && 
        <Loading/>
        }
        { !isFetching &&
            <section>
                <h2>{ post.title } - { post.dateCreated }</h2>
                <p>{ post.text }</p>
            </section>
            }
            <img className="index" src="img/tumblr.svg" alt="Icono"/>
        </article>
);

DiaryPost.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};
export default DiaryPost;
