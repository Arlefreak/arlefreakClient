import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';

import { formatSecondsAsTime } from '../../utils';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
  }

  componentWillMount() {
    this.props.onDestroy();
  }

  componentWillUnmount() {
    console.log('destroy');
    this.clearRAF();
    this.player.stop();
    this.props.onDestroy();
  }

  clearRAF() {
    raf.cancel(this._raf);
  }

  handleOnEnd() {
    this.props.onStop();
    handlePlay();
  }

  handleOnLoad() {
    this.props.onLoad(this.player.duration());
  }

  handleSeek(seek) {
    this.props.onProgress(seek);
    this.player.seek(seek);
    this.renderSeekPos();
  }

  renderSeekPos() {
    if (this.props.playStatus) {
      this.props.onProgress(this.player.seek());
      this._raf = raf(this.renderSeekPos);
    }
  }

  handlePlay() {
    this.renderSeekPos();
    console.log('succes');
  }

  render() {
    const isPlaying = this.props.playStatus;
    const isStopped = !this.props.playStatus;

    let a = this.props.duration.split(':');
    const duration_s = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    const position_p = (this.props.position * 100 / duration_s) << 0;

    const progress_p_style = {
      width: `calc(${position_p}% + 4px)`,
    };

    const progress_l_style = {
      width: `${(this.props.audioBytesLoaded /
        this.props.audioBytesTotal *
        100) <<
        0}%`,
    };

    const volume_style = {
      width: `${this.props.volume * 100}%`,
    };
    return (
      <div className="audio-player">
        <ReactHowler
          src={[this.props.url_ogg, this.props.url_mp3]}
          playing={this.props.playStatus}
          preload={true}
          loop={false}
          volume={this.props.volume}
          html5={true}
          onLoad={this.handleOnLoad}
          onPlay={this.handlePlay}
          onEnd={this.handleOnEnd}
          ref={ref => (this.player = ref)}
        />

        <ul className="player-controls">
          {isPlaying && (
            <li className="button" onClick={this.props.onPause}>
              <i className="fa fa-pause" aria-hidden="true" />
            </li>
          )}
          {!isPlaying && (
            <li className="button" onClick={this.props.onPlay}>
              <i className="fa fa-play" aria-hidden="true" />
            </li>
          )}
        </ul>

        <div className="audio-bar">
          <div className="audio-bar-lines">
            <div className="progressbar total" />
            <div style={progress_l_style} className="progressbar loading" />
            <div style={progress_p_style} className="progressbar position" />
            <input
              type="range"
              value={this.props.position}
              min={0}
              max={duration_s}
              step={1}
              onChange={e => this.handleSeek(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <span className="progress-time">{`${formatSecondsAsTime(
          this.props.position
        )}/${this.props.duration}`}</span>

        <div className="volume-controls">
          {this.props.volume == 0 && (
            <a className="button yellow">
              <i className="fa fa-volume-off" aria-hidden="true" />
            </a>
          )}
          {this.props.volume > 0 && (
            <a className="button yellow">
              <i className="fa fa-volume-up" aria-hidden="true" />
            </a>
          )}
          <div className="volume-bar-lines">
            <div className="progressbar total" />
            <div style={volume_style} className="progressbar volume" />
            <input
              type="range"
              value={this.props.volume}
              min={0}
              max={1.0}
              step={0.1}
              onChange={this.props.onVolumeChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  url_mp3: PropTypes.string.isRequired,
  url_ogg: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,

  playStatus: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,

  audioBytesLoaded: PropTypes.number,
  audioBytesTotal: PropTypes.number,

  onPlay: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,

  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,

  onProgress: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,

  onVolumeChange: PropTypes.func.isRequired,
  onVolumeUp: PropTypes.func.isRequired,
  onVolumeDown: PropTypes.func.isRequired,
};

export default AudioPlayer;
