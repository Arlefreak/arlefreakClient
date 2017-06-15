import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';
import AudioPlayer from '../containers/audio__player.js';

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
                <div className="podcast-column episode-buttons">
                    <ul className="subscribe-buttons">
                        { prev != null &&
                                <li><Link className="button yellow" to={ `/podcasts/${slug}/${prev}` }>prev</Link></li>
                        }
                        { prev == null &&
                                <li><Link className="button yellow" to={ `/podcasts/${slug}/` }>all</Link></li>
                        }
                        { next != null &&
                                <li><Link className="button yellow" to={ `/podcasts/${slug}/${next}` }>next</Link></li>
                        }
                        { next == null &&
                                <li><Link className="button yellow" to={ `/podcasts/${slug}/` }>all</Link></li>
                        }
                        <li><a rel="noopener noreferrer" target="_blank" className="button pink" href={ feed }>rss</a></li>
                        { iTunesURL != null &&
                                <li><a rel="noopener noreferrer" target="_blank" className="button blue" href={ iTunesURL }>iTunes</a></li>
                        }
                    </ul>
                </div>
                <div className="margin"></div>
                <AudioPlayer url={ item.audio_ogg } duration={ item.duration } />
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
