import { 
    SET_PLAY_STATUS,
    SET_AUDIO_POSITION,
    SET_AUDIO_VOLUME,
    SET_AUDIO_BYTES_LOADED,
    SET_AUDIO_BYTES_TOTAL,
    SET_AUDIO_DURATION_TOTAL,
} from '../actions/audio_actions';

export function audio(
    state = {
        playStatus: false,
        audioPosition: 0,
        audioVolume: 1,
        audioBytesLoaded: 0,
        audioBytesTotal: 0,
        audioDurationTotal: 0,
    },
    action
) {
    switch(action.type) {
        case SET_PLAY_STATUS:
            return {
                ...state,
                playStatus: action.status,
            };
        case SET_AUDIO_POSITION:
            return {
                ...state,
                audioPosition: action.position,
            };
        case SET_AUDIO_VOLUME:
            return {
                ...state,
                audioVolume: action.volume,
            };
        case SET_AUDIO_BYTES_LOADED:
            return {
                ...state,
                audioBytesLoaded: action.bytes,
            };
        case SET_AUDIO_BYTES_TOTAL:
            return {
                ...state,
                audioBytesTotal: action.bytes,
            };

        case SET_AUDIO_DURATION_TOTAL:
            return {
                ...state,
                audioDurationTotal: action.duration,
            };

        default:
            return state;
    }
}
