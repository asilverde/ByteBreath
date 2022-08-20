import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function Home({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('../assets/sounds/short-bell.wav'), {}, true);
    
    return (
        <View style={styles.container}>
            
            <Text style={styles.header}>5 BREATHS</Text>
            <Text style={styles.text}>A simple, tactile approach to meditation. Track the yellow orb with your finger and synchronize your breath to movement.</Text>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                AudioPlayer.current.playFromPositionAsync(0);
                navigation.navigate('Game');
              }
            }>
                <AntDesign name="arrowright" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('Settings');
              }
            }>
                Settings
            </TouchableOpacity>
        </View>
    );
}

export default Home
