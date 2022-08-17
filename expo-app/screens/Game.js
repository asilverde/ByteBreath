import React, { useRef } from 'react';
import { View } from 'react-native';
import Slider from "../components/Slider.js"
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function Game({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('../assets/sounds/long-bell.wav'), {}, true);

    return (
        <View>
            <Slider
            endSession={(breathCount) => {
              AudioPlayer.current.playFromPositionAsync(0);
              navigation.navigate('End', {breathCount});
            }}/>
        </View>
    );
}

export default Game
