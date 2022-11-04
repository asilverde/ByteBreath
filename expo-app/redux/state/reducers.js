import { UPDATE_SETTINGS } from '../actions/breathSettings';
import { combineReducers } from 'redux';

const settings = (settings = { inhale: 5, exhale: 5, pause: 2, 
                               style: 'box', scene: 'space', sound: 'breath' }, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return { 
                    inhale: action.settings.inhale,   
                    exhale: action.settings.exhale,
                    pause: action.settings.pause,   
                    style: action.settings.style, 
                    scene: action.settings.scene,
                    sound: action.settings.sound
                    }
        default:
            return {
                    inhale: settings.inhale,   
                    exhale: settings.exhale,
                    pause: settings.pause,   
                    style: settings.style, 
                    scene: settings.scene,
                    sound: settings.sound
                   };
    }
}

export default combineReducers({ settings });