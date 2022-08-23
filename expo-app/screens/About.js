import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function About({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={[styles.header, {justifyContent:'flex-start'}]}>
                <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => { 
                    navigation.navigate('Home');
                }
                }>
                    <MaterialIcons name="cancel" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
            </View>
        </View>
    );
}

export default About