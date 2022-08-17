import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Screens.styles.js';
import { Fontisto } from '@expo/vector-icons'; 
function Win({ route, navigation }) {
    const {breathCount} = route.params;
    const endText = `Completed Breaths: ${breathCount}`;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{(breathCount == 5) ? 'Good Job' : ''}</Text>
            <Text style={styles.text}>{endText}</Text>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
                <Fontisto name="redo" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default Win