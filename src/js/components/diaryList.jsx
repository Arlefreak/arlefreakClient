import React, { PropTypes } from 'react';
import DiaryRow  from './diaryRow.jsx';

function DiaryList ({ posts }) {
    return (
        <article className="diary">
            <h2>Diary</h2>
            <ul className="vertical-list">
                {
                    posts.map( post =>
                              <DiaryRow
                                  key={post.id}
                                  {...post}
                              />
                              )
                }
            </ul>
            <img className="index" src="img/d.svg" alt="Icono"/>
        </article>
    );
};

DiaryList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired
};

export default DiaryList;
