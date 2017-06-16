import PropTypes from 'prop-types';
import React from 'react';
import Sound from 'react-sound';

const AudioPlayer = ({ 
    url,
    duration,

    playStatus,
    volume,
    position,
    audioBytesLoaded,
    audioBytesTotal,

    onPlay,
    onStop,

    onPause,
    onResume,

    onProgress,
    onSeek,
    onLoad,

    onVolumeChange,
    onVolumeUp,
    onVolumeDown,
}) => {
    const isPlaying = playStatus == Sound.status.PLAYING;
    const isStopped = playStatus == Sound.status.STOPPED;

    const position_s = ('0' + ((position/1000) % 60  << 0)).slice(-2);
    const position_m = ('0' + ((position/1000/60) << 0)).slice(-2);
    const position_h = ('0' + ((position/1000/60/60) << 0)).slice(-2);

    let a = duration.split(':');
    const duration_s = ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])); 

    const position_p = ((position / 10) / (duration_s)) << 0;

    const progress_p_style = {
        width: `calc(${position_p}% + 4px)`
    };

    const progress_l_style = {
        width: `${(audioBytesLoaded / audioBytesTotal * 100) << 0}%`
    };

    const volume_style = {
        width: `${volume}%`
    };


    if (typeof window === 'undefined')
        global.window = {};
    if(typeof window.soundManager !== 'undefined')
        window.soundManager.setup({ignoreMobileRestrictions: true});

    return(
        <div className="audio-player">
            <Sound
                url = { url }
                playStatus = { playStatus }
                position = { position }
                volume = { volume }
                onPlaying={({position}) => onProgress(position) }
                onLoading={({bytesLoaded, bytesTotal}) => onLoad(bytesLoaded, bytesTotal) }
            />

        <ul className="player-controls">
            { isPlaying &&
                    <li className="button" onClick={ onPause }><i className="fa fa-pause" aria-hidden="true"></i></li>
            }
            { !isPlaying &&
                    <li className="button" onClick={ onPlay }><i className="fa fa-play" aria-hidden="true"></i></li>
            }
            <li className="button" onClick={ onStop}><i className="fa fa-stop" aria-hidden="true"></i></li>
        </ul>

        <div className="audio-bar">
            <div className="audio-bar-lines">
                <div className="progressbar total"></div>
                <div style={ progress_l_style } className="progressbar loading"></div>
                <div style={ progress_p_style } className="progressbar position"></div>
                <input
                    type="range"
                    value={ position/1000 }
                    min={ 0 }
                    max={ duration_s }
                    step={ 1 }
                    onChange={ onSeek }
                />
            </div>
        </div>
        <span className="progress-time">{ `${position_h}:${position_m}:${position_s}/${duration}`}</span>

        <div className="volume-controls">
            { volume == 0 && <a className="button yellow"><i className="fa fa-volume-off" aria-hidden="true"></i></a> }
            { volume > 0 && <a className="button yellow"><i className="fa fa-volume-up" aria-hidden="true"></i></a> }
            <div className="volume-bar-lines">
                <div className="progressbar total"></div>
                <div style={ volume_style } className="progressbar volume"></div>
                <input
                    type="range"
                    value={ volume }
                    min={ 0 }
                    max={ 100 }
                    step={ 10 }
                    onChange={ onVolumeChange }
                />
            </div>
        </div>
        </div>
    );
};

AudioPlayer.propTypes = {
    url: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,

    playStatus: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,

    audioBytesLoaded: PropTypes.number.isRequired,
    audioBytesTotal: PropTypes.number.isRequired,

    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,

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
