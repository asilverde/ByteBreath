import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function Settings({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => { navigation.navigate('Home') }
            }>
                <Text>X</Text>
            </TouchableOpacity>
            <View style={styles.settingsPanel}>
                
            </View>
            <Text style={styles.header}>Settings</Text>
        </View>
    );
}

export default Settings