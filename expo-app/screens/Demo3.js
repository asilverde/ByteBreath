import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';

import styles from './Screens.styles.js';

export default function Demo3({ navigation }) {
    const [touchX, setTouchX] = useState(0);

    return(
        <View onTouchStart={e => setTouchX(e.nativeEvent.pageX)}
              onTouchEnd={e => {
                  if (touchX - e.nativeEvent.pageX < -20)
                    navigation.navigate('Demo2');
              }}
              style={styles.container}>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    left: "2.85%",
                    right: "14.49%",
                    top: "3.00%"

                }}
                onPress={() => {
                    navigation.navigate('Home');
                }
                }>
                <MaterialIcons name="cancel" size={32} color="gray" />
            </TouchableOpacity>
            <View style={styles.demoStage}>
                <Text style={styles.titleText}>3</Text>
                <View style={[styles.ellipse, {backgroundColor:"black", left:50, top:70}]}></View>
                <View style={[styles.ellipse, {backgroundColor:"black", left:50, top:50}]}></View>
                <View style={[styles.ellipse, {backgroundColor:"black", left:50, top:30}]}></View>
            </View>
            <View style={[styles.bodyBox, {width: 380, left: 30, top:220}]}>
                <Text style={styles.bodyText}>synchronize your breath to movement.</Text>
            </View>
            
            <TouchableOpacity 
            style={styles.beginButton}
            onPress={() => {
                navigation.navigate('Game');
            }}>
                <Text style={styles.beginText}>begin</Text>
            </TouchableOpacity>
        </View>
    );
}
