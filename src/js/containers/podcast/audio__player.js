import { connect } from 'react-redux';
import {
  setPlayStatus,
  setAudioPosition,
  setAudioVolume,
  setAudioBytesLoaded,
  setAudioBytesTotal,
  setAudioDurationTotal,
} from '../../actions/audio_actions';
import AudioPlayerComponent from '../../components/audio_player';

const mapStateToProps = state => {
  const { audio } = state;
  return {
    playStatus: audio.playStatus,
    volume: audio.audioVolume,
    position: audio.audioPosition,
    audioBytesLoaded: audio.audioBytesLoaded,
    audioBytesTotal: audio.audioBytesTotal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlay: () => {
      dispatch(setPlayStatus(true));
    },

    onStop: () => {
      dispatch(setPlayStatus(false));
      dispatch(setAudioPosition(0));
    },

    onDestroy: () => {
      dispatch(setPlayStatus(false));
      dispatch(setAudioPosition(0));
      dispatch(setAudioDurationTotal(0));
      dispatch(setAudioBytesLoaded(0));
      dispatch(setAudioBytesTotal(0));
    },

    onPause: () => {
      dispatch(setPlayStatus(false));
    },
    onResume: () => {
      dispatch(setPlayStatus(false));
    },

    onVolumeUp: () => {
      dispatch(setAudioVolume(100));
    },
    onVolumeDown: () => {
      dispatch(setAudioVolume(0));
    },

    onVolumeChange: event => {
      dispatch(setAudioVolume(parseFloat(event.target.value)));
    },

    onProgress: position => {
      dispatch(setAudioPosition(position));
    },

    onSeek: event => {
      dispatch(setAudioPosition(event.target.value * 1000));
    },

    onLoad: duration => {
      dispatch(setAudioDurationTotal(duration));
    },

    // onLoad: (bytesLoaded, bytesTotal) => {
    //     dispatch(setAudioBytesLoaded(bytesLoaded));
    //     dispatch(setAudioBytesTotal(bytesTotal));
    // }
  };
};

const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(
  AudioPlayerComponent
);

export default AudioPlayer;
