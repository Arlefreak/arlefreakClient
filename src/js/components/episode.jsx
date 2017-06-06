import PropTypes from 'prop-types';
import React from 'react';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const Episode = ({ 
    item,
}) => {
    var md = new Remarkable();
    var text = item.text;
    var mdr = md.render(text);
    return(
        <section className="episode">
            { item.dateCreated != null && 
                    <div className="date-container">
                        <span className="date">{ item.dateCreated } |</span> 
                        <span className="date"> { item.dateUpdated }</span>
                    </div>
            }
            <div className="episode-info">
                <img className="episode-cover" src={ item.image } alt={ item.title } />
                <audio className="episode-player" controls>
                    <source src={ item.audio_mp3 } type={ item.audio_type } />
                    <source src={ item.audio_ogg } type={ item.audio_type } />
                </audio> 
            </div>

            <div className="episode-description markdown" dangerouslySetInnerHTML={{ __html: mdr }}/>
        </section>
    );
};

Episode.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        text: PropTypes.string,
        duration: PropTypes.string,
        file_mp3: PropTypes.string,
        audio_type: PropTypes.string,
        audio_size: PropTypes.number,
    }).isRequired,
};
export default Episode;
