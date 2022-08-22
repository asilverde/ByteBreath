import React, {useRef, useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../redux/actions/breathSettings';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './Screens.styles.js';

function Settings({ navigation }) {
    const dispatch = useDispatch();

    const settings = useSelector( state => state.settings );

    const [inhale, setInhale] = useState(settings.inhale);
    const [exhale, setExhale] = useState(settings.exhale);
    const [pause, setPause] = useState(settings.pause);
    const [mode, setMode] = useState(settings.mode);
    const [background, setBackground] = useState(settings.background);

    const update = () => {
        const newSettings = {
            inhale: inhale,   
            exhale: exhale,
            pause: pause,   
            mode: mode, 
            background: background
        }
        dispatch( updateSettings(newSettings) );
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => { 
                update();
                navigation.navigate('Home');
            }
            }>
                <Text>X</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <Text>MODE:</Text>
                <TouchableOpacity
                style={styles.button} 
                onPress={() => { setMode('BOX') }
                }>
                    <Text>BOX</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => { setMode('CIRCLE') }
                }>
                    <Text>CIRCLE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => { setMode('LINE') }
                }>
                    <Text>LINE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings