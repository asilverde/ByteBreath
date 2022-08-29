import React, {useRef, useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../redux/actions/breathSettings';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {Picker} from '@react-native-picker/picker';

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
            <View style={[styles.header, {justifyContent:'flex-start'}]}>
                <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => { 
                    update();
                    navigation.navigate('Home');
                }
                }>
                    <MaterialIcons name="cancel" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
                    <Picker style={{ flex: 1 }}
                    selectedValue={inhale}
                    onValueChange={(itemValue, itemIndex) =>
                        setInhale(itemValue)
                    }>
                        <Picker.Item value={1} label="1" />
                        <Picker.Item value={2} label="2" />
                        <Picker.Item value={3} label="3" />
                        <Picker.Item value={4} label="4" />
                        <Picker.Item value={5} label="5" />
                    </Picker>
                    <Text>INHALE</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
                    <Picker style={{ flex: 1 }}
                    selectedValue={exhale}
                    onValueChange={(itemValue, itemIndex) =>
                        setExhale(itemValue)
                    }>
                        <Picker.Item value={1} label="1" />
                        <Picker.Item value={2} label="2" />
                        <Picker.Item value={3} label="3" />
                        <Picker.Item value={4} label="4" />
                        <Picker.Item value={5} label="5" />
                    </Picker>
                    <Text>EXHALE</Text>
                </View>
            </View>
            <View style={styles.row}>
            </View>
            <View style={styles.row}>
                <Text style={styles.text} >MODE:</Text>
                <TouchableOpacity
                style={styles.smallButton} 
                onPress={() => { setMode('BOX') }
                }>
                    <Text>BOX</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => { setMode('CIRCLE') }
                }>
                    <Text>CIRCLE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.smallButton}
                onPress={() => { setMode('LINE') }
                }>
                    <Text>LINE</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={styles.text} >BACKGROUND:</Text>
                <TouchableOpacity
                style={styles.smallButton} 
                onPress={() => { setBackground('SPACE') }
                }>
                    <Text>SPACE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => { setBackground('FOREST') }
                }>
                    <Text>FOREST</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.smallButton}
                onPress={() => { setBackground('CLOUDS') }
                }>
                    <Text>CLOUDS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings