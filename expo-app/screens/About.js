import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function About({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => { navigation.navigate('Home') }
            }>
                <Text>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>About</Text>
        </View>
    );
}

export default About