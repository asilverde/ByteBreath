import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { AntDesign, Feather} from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function Home({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('../assets/sounds/short-bell.wav'), {}, true);
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={{
                position: "absolute",
                left: "75.85%",
                right: "14.49%",
                top: "3.67%",
                
                background: "#000000"
            }}
            onPress={() => {
                navigation.navigate('About');
            }
            }>
                <AntDesign name="questioncircle" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
            style={{
                position: "absolute",
                left: "88.19%",
                right: "3.16%",
                top: "3.79%",
                
                background: "#000000"
            }}
            onPress={() => {
                navigation.navigate('Settings');
            }
            }>
                <Feather name="settings" size={24} color="gray" />
            </TouchableOpacity>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>byte breath</Text>
            </View>
            <View style={styles.bodyBox}>
                <Text style={styles.bodyText}>short tactile breathing to relieve anxiety</Text>
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

export default Home

// <View style={styles.header}>
//                 <TouchableOpacity
//                 style={styles.smallButton}
//                 onPress={() => {
//                     navigation.navigate('About');
//                 }
//                 }>
//                     <AntDesign name="questioncircle" size={24} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={styles.smallButton}
//                 onPress={() => {
//                     navigation.navigate('Settings');
//                 }
//                 }>
//                     <Feather name="settings" size={24} color="black" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.container}>
//                 <Text style={styles.title}>BYTE BREATH</Text>
//                 <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => {
//                     AudioPlayer.current.playFromPositionAsync(0);
//                     navigation.navigate('Game');
//                 }
//                 }>
//                     <AntDesign name="arrowright" size={30} color="black" />
//                 </TouchableOpacity>
//             </View>

