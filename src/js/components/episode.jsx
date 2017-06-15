import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const Episode = ({ 
    item,
    slug,
    iTunesURL,
    feed,
    prev,
    next,
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
                <div className="podcast-column">
                    <h3>Subscribe</h3>
                    <ul className="subscribe-buttons">
                        { prev != null &&
                                <li><Link to={ `/podcasts/${slug}/${prev}` }>prev</Link></li>
                        }
                        <li><a rel="noopener noreferrer" target="_blank" className="button rss" href={ item.feed }>rss</a></li>
                        { item.iTunesURL != null &&
                                <li><a rel="noopener noreferrer" target="_blank" className="button iTunes" href={ item.iTunesURL }>iTunes</a></li>
                        }
                        { next != null &&
                                <li><Link to={ `/podcasts/${slug}/${next}` }>next</Link></li>
                        }
                    </ul>
                </div>
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
    slug: PropTypes.string.isRequired,
    iTunesURL: PropTypes.string,
    feed: PropTypes.string.isRequired,
    prev: PropTypes.string,
    next: PropTypes.string,
};
export default Episode;
