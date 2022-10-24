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
