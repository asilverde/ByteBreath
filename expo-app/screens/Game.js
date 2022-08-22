import React, { useRef } from 'react';
import { View } from 'react-native';
import MovingButton from "../components/MovingButton"
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function Game({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('../assets/sounds/long-bell.wav'), {}, true);

    return (
        <View>
            <MovingButton
            endSession={(breathCount) => {
              AudioPlayer.current.playFromPositionAsync(0);
              navigation.navigate('End', {breathCount});
            }}/>
        </View>
    );
}

export default Game
