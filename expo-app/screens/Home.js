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
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('About');
            }
            }>
                <Text>?</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('Settings');
            }
            }>
                <Text>Settings</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.title}>BYTE BREATH</Text>
                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    AudioPlayer.current.playFromPositionAsync(0);
                    navigation.navigate('Game');
                }
                }>
                    <AntDesign name="arrowright" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home
