import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Remarkable from 'remarkable';

import Loading from '../loading';
import AudioPlayer from '../../containers/podcast/audio__player';

const Episode = ({ item, slug, iTunesURL, feed, prev, next }) => {
  var md = new Remarkable();
  var text = item.text;
  var mdr = md.render(text);
  return (
    <section className="episode">
      <div className="episode-info">
        <div className="episode-cover">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="podcast-column episode-buttons">
          <ul className="subscribe-buttons">
            {prev != null && (
              <li>
                <Link
                  className="button yellow"
                  to={`/podcasts/${slug}/${prev}`}
                >
                  prev
                </Link>
              </li>
            )}
            {prev == null && (
              <li>
                <Link className="button yellow" to={`/podcasts/${slug}/`}>
                  all
                </Link>
              </li>
            )}
            {next != null && (
              <li>
                <Link
                  className="button yellow"
                  to={`/podcasts/${slug}/${next}`}
                >
                  next
                </Link>
              </li>
            )}
            {next == null && (
              <li>
                <Link className="button yellow" to={`/podcasts/${slug}/`}>
                  all
                </Link>
              </li>
            )}
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="button pink"
                href={feed}
              >
                rss
              </a>
            </li>
            {iTunesURL != null && (
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="button blue"
                  href={iTunesURL}
                >
                  iTunes
                </a>
              </li>
            )}
            <li>
              <a
                className="button yellow"
                href={item.audio_ogg}
                rel="noopener noreferrer"
                target="_blank"
                download={`${item.title}.ogg`}
              >
                download
              </a>
            </li>
          </ul>
        </div>
        <div className="margin" />
        <AudioPlayer
          url_mp3={item.audio_ogg}
          url_ogg={item.audio_mp3}
          duration={item.duration}
        />
      </div>

      <div
        className="episode-description markdown"
        dangerouslySetInnerHTML={{ __html: mdr }}
      />
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
