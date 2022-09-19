import { UPDATE_SETTINGS } from '../actions/breathSettings';
import { combineReducers } from 'redux';

const settings = (settings = { inhale: 5, exhale: 5, pause: 2, mode: 'square', background: 'SPACE'}, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return { inhale: action.settings.inhale,   
                     exhale: action.settings.exhale,
                     pause: action.settings.pause,   
                     mode: action.settings.mode, 
                     background: action.settings.background}
        default:
            return settings;
    }
}

export default combineReducers({ settings });