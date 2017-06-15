import Sound from 'react-sound';
import { connect } from 'react-redux';
import { setPlayStatus, setAudioPosition, setAudioVolume, setAudioBytesLoaded, setAudioBytesTotal } from '../actions/audio_actions';
import AudioPlayerComponent from '../components/audio_player.jsx';;

const mapStateToProps = (state) => {
    const { audio } = state;
    return {
        playStatus: audio.playStatus,
        volume: audio.audioVolume,
        position: audio.audioPosition,
        audioBytesLoaded: audio.audioBytesLoaded,
        audioBytesTotal: audio.audioBytesTotal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPlay: () => {
            dispatch(setPlayStatus(Sound.status.PLAYING));
        },
        onStop: () => {
            dispatch(setPlayStatus(Sound.status.STOPPED));
        },

        onPause: () => {
            dispatch(setPlayStatus(Sound.status.PAUSED));
        },
        onResume: () => {
            dispatch(setPlayStatus(Sound.status.PLAYING));
        },

        onVolumeUp: () => {
            dispatch(setAudioVolume(100));
        },
        onVolumeDown: () => {
            dispatch(setAudioVolume(0));
        },

        onVolumeChange: (event) => {
            dispatch(setAudioVolume(event.target.value));
        },

        onProgress: (position) => {
            dispatch(setAudioPosition(position));
        },

        onSeek: (event) => {
            dispatch(setAudioPosition(event.target.value * 1000));
        },

        onLoad: (bytesLoaded, bytesTotal) => {
            dispatch(setAudioBytesLoaded(bytesLoaded));
            dispatch(setAudioBytesTotal(bytesTotal));
        }
    };
};

const AudioPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioPlayerComponent);

export default AudioPlayer;
