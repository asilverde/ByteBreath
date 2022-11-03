import { UPDATE_SETTINGS} from '../actions/breathSettings';
import { combineReducers } from 'redux';

const settings = (settings = { inhale: 5, exhale: 5, pause: 2, 
                               mode: 'box', scene: 'space',
                               sound: 'breath', action }) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return  { 
                        inhale: action.settings.inhale,   
                        exhale: action.settings.exhale,
                        pause: action.settings.pause,   
                        style: action.settings.style, 
                        scene: action.settings.scene,
                        sound: action.settings.sound
                    }
        default:
            return settings;
    }
}

export default combineReducers({ settings });