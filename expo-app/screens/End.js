import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Screens.styles.js';
import { Fontisto } from '@expo/vector-icons'; 
function End({ route, navigation }) {
    const {breathCount} = route.params;
    const endText = `Completed Breaths: ${breathCount}`;
    return (
        <View style={styles.container}>
            <View style={[styles.titleBox, {top:30}]}>
                <Text style={[styles.titleText, {}]}>great!</Text>
            </View>
            <View style={styles.bodyBox}>
                <Text style={styles.bodyText}>{endText}</Text>
            </View>
            <TouchableOpacity 
            style={styles.beginButton}
            onPress={() => {
                navigation.navigate('Home');
            }}>
                <Fontisto name="redo" size={36} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default End