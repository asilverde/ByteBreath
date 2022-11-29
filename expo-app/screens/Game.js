import React, { useRef } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';

import BoxBreathing from './components/BoxBreathing';
import LineBreathing from './components/BoxBreathing';
import TriBreathing from './components/BoxBreathing';

function Game({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('../assets/sounds/Complete.wav'), {}, true);

    const settings = useSelector( state => state.settings );

    const audio = {
        "box": {
            "breath": require('../assets/sounds/box-breath.wav'),
            "om": require('../assets/sounds/box-om.wav'),
            "wave": require('../assets/sounds/box-wave.wav')
        },
        "line": {
            "breath": require('../assets/sounds/line-breath.wav'),
            "om": require('../assets/sounds/line-om.wav'),
            "wave": require('../assets/sounds/line-wave.wav')
        },
        "triangle": {
            "breath": require('../assets/sounds/tri-breath.wav'),
            "om": require('../assets/sounds/tri-om.wav'),
            "wave": require('../assets/sounds/tri-wave.wav')
        }
    }

    const endSession = (breathCount) => {
        if (breathCount == 5) {
            AudioPlayer.current.playFromPositionAsync(0);
            navigation.navigate('End');
        } else {
            AudioPlayer.current.unloadAsync();
            navigation.navigate('Home');
        }
    }

    const gameMode = () => {
        if (settings.style == "box") {
            return <BoxBreathing endSession={endSession} audioFile={audio[settings.style][settings.sound]}/>
        } else if (settings.style == "line") {
            return <LineBreathing endSession={endSession} audioFile={audio[settings.style][settings.sound]}/>
        } else {
            return <TriBreathing endSession={endSession} audioFile={audio[settings.style][settings.sound]}/>
        }
    };

    return (
        <View>
            {gameMode()}
        </View>
    );
}

export default Game;