import React, { useRef } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Screens.styles.js';
import BoxBreathing from '../components/BoxBreathing';
import LineBreathing from '../components/LineBreathing';
import TriBreathing from '../components/TriBreathing';

function Game({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('../assets/sounds/Complete.wav'), {}, true);

    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    const endSession = (breathCount) => {
        if (breathCount == 5) {
            AudioPlayer.current.playFromPositionAsync(0);
            navigation.navigate('End', {breathCount});
        } else {
            navigation.navigate('Home');
        }
    }

    const gameMode = () => {
        if (settings.mode == "box") {
            return <BoxBreathing endSession={endSession}/>
        } else if (settings.mode == "line") {
            return <LineBreathing endSession={endSession}/>
        } else {
            return <TriBreathing endSession={endSession}/>
        }
    };

    return (
        <View>
            {gameMode()}
        </View>
    );
}

export default Game
