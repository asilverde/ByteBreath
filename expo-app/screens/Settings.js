import React, {useState, useRef, useEffect} from 'react';
import { Icon, Animated, LayoutAnimation, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../redux/actions/breathSettings';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

import styles from './Screens.styles.js';

function Settings({ navigation }) {
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    const [mode, setMode] = useState(settings.mode);
    const [background, setBackground] = useState(settings.background);
    const [sound, setSound] = useState(settings.sound);

    const updateSound = (newSound, i) => {
        if (sound.includes(newSound)) {
            setSound(sound.filter(item => item !== newSound));
        } else {
            setSound(sound.concat(newSound));
        }
    };

    const update = () => {
        const newSettings = {
            inhale: 5,   
            pause: 2, 
            exhale: 5,  
            mode: mode, 
            background: background,
            sound: sound,
        }
        dispatch( updateSettings(newSettings) );
    };

    const Accordion = ({ title, current, func, options, offset}) => {
        const [open, setOpen] = useState(false);
        const animatedController = useRef(new Animated.Value(0)).current;
    
        const bodyHeight = animatedController.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 80],
        });

        var buttons = []

        for (let i = 0; i < options.length; i++) {
            let highlight = (current == options[i]);
            if (Array.isArray(current)) {
                highlight = current.includes(options[i]);
            }
            buttons.push(
                <TouchableOpacity
                style={[styles.smallButton, {backgroundColor: highlight ? "#68cbf8" : "#D9D9D9"}]} 
                onPress={() => { 
                    func(options[i]) 
                }}>
                    <Text>{options[i]}</Text>
                </TouchableOpacity>
            );
        }
      
        const toggleOpen = () => {
            if (open) {
              Animated.timing(animatedController, {
                useNativeDriver: false,
                duration: 300,
                toValue: 0,
              }).start();
            } else {
              Animated.timing(animatedController, {
                useNativeDriver: false,
                duration: 300,
                toValue: 1,
              }).start();
            }
            setOpen(!open);
        };
      
        return (
          <>
            <TouchableOpacity onPressIn={toggleOpen} activeOpacity={0.0}>
                <Text style={[styles.settingsStyle, {top: offset}]}>{title}</Text>
            </TouchableOpacity>
            <Text style={[styles.settingsCurrent, {top: offset}]}>{(Array.isArray(current)) ? current.length : current}</Text>
            <View style={[styles.line1, {top:offset + 50}]}></View>
            <Animated.View style={[styles.row, { top: offset+60, overflow:"hidden", height: bodyHeight }]}>
                {buttons}
            </Animated.View>
          </>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    left: "2.85%",
                    right: "14.49%",
                    top: "3.00%"

                }}
                onPress={() => {
                    update();
                    navigation.navigate('Home');
                }
                }>
                    <MaterialIcons name="cancel" size={32} color="gray" />
            </TouchableOpacity>
            <Text style={styles.settingsHeader}>settings</Text>
            <View style={styles.rectangle1}></View>
            <Accordion title="style" current={mode} func={setMode} 
                       options={["box", "line", "triangle"]} offset={160}>
            </Accordion>
            <Accordion title="scene" current={background} func={setBackground} 
                       options={["space", "nature", "cloud"]} offset={280}>
            </Accordion>

            <TouchableOpacity 
            style={styles.beginButton}
            onPress={() => {
                update();
                navigation.navigate('Game');
            }}>
                <Text style={styles.beginText}>begin</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Settings