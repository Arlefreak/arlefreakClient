export const SET_PLAY_STATUS = 'SET_PLAY_STATUS';
export const SET_AUDIO_POSITION = 'SET_AUDIO_POSITION';
export const SET_AUDIO_VOLUME = 'SET_AUDIO_VOLUME';
export const SET_AUDIO_BYTES_LOADED = 'SET_AUDIO_BYTES_LOADED';
export const SET_AUDIO_BYTES_TOTAL = 'SET_AUDIO_BYTES_TOTAL';

export function setPlayStatus(status) {
    return {
        type: SET_PLAY_STATUS,
        status
    };
}

export function setAudioPosition(position) {
    return {
        type: SET_AUDIO_POSITION,
        position
    };
}

export function setAudioVolume(volume) {
    return {
        type: SET_AUDIO_VOLUME,
        volume
    };
}

export function setAudioBytesLoaded(bytes) {
    return {
        type: SET_AUDIO_BYTES_LOADED,
        bytes
    };
}

export function setAudioBytesTotal(bytes) {
    return {
        type: SET_AUDIO_BYTES_TOTAL,
        bytes
    };
}
