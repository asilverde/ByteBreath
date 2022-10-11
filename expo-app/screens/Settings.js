import React, {useState, useRef, useEffect} from 'react';
import { Icon, Animated, LayoutAnimation, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../redux/actions/breathSettings';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

import styles from './Screens.styles.js';

const Accordion = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [bodySectionHeight, setBodySectionHeight] = useState(0);

    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });
  
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
        <TouchableOpacity onPress={toggleOpen} activeOpacity={0.6}>
          {title}
        </TouchableOpacity>
        <Animated.View style={[c_styles.list, { height: bodyHeight }]}>
            {children}
        </Animated.View>
      </>
    );
};

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
            <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
                <Text style={styles.settingsStyle}>style</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <TouchableOpacity
                style={[styles.smallButton, {backgroundColor: (mode == 'box') ? "#68cbf8" : "#D9D9D9"}]} 
                onPress={() => { setMode('box') }
                }>
                    <Text>box</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.smallButton, {backgroundColor: (mode == 'circle') ? "#68cbf8" : "#D9D9D9"}]}
                onPress={() => { setMode('circle') }
                }>
                    <Text>circle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.smallButton, {backgroundColor: (mode == 'line') ? "#68cbf8" : "#D9D9D9"}]}
                onPress={() => { setMode('line') }
                }>
                    <Text>line</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line1}></View>
            <TouchableOpacity 
            style={styles.beginButton}
            onPress={() => {
                update();
                navigation.navigate('Game');
            }}>
                <Text style={styles.beginText}>begin</Text>
            </TouchableOpacity>
            <View style={styles.row2}>
                <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
                    <Picker style={{ flex: 1 }}
                    prompt="INHALE"
                    selectedValue={inhale}
                    onValueChange={(itemValue, itemIndex) =>
                        setInhale(itemValue)
                    }>
                        <Picker.Item value={1} label="1" />
                        <Picker.Item value={2} label="2" />
                        <Picker.Item value={3} label="3" />
                        <Picker.Item value={4} label="4" />
                        <Picker.Item value={5} label="5" />
                        <Picker.Item value={6} label="6" />
                        <Picker.Item value={7} label="7" />
                        <Picker.Item value={8} label="8" />
                        <Picker.Item value={9} label="9" />
                        <Picker.Item value={10} label="10" />
                    </Picker>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
                    <Picker style={{ flex: 1 }}
                    selectedValue={pause}
                    onValueChange={(itemValue, itemIndex) =>
                        setPause(itemValue)
                    }>
                        <Picker.Item value={1} label="1" />
                        <Picker.Item value={2} label="2" />
                        <Picker.Item value={3} label="3" />
                        <Picker.Item value={4} label="4" />
                        <Picker.Item value={5} label="5" />
                    </Picker>
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
                        <Picker.Item value={6} label="6" />
                        <Picker.Item value={7} label="7" />
                        <Picker.Item value={8} label="8" />
                        <Picker.Item value={9} label="9" />
                        <Picker.Item value={10} label="10" />
                    </Picker>
                </View>
            </View>
        </View>
    );
}
const c_styles = StyleSheet.create({
    hidden: {
      height: 0,
    },
    list: {
      overflow: 'hidden'
    },
});

export default Settings
/* <TouchableOpacity onPress={setIsStyleOpen(!isStyleOpen)} activeOpacity={0.6}>
                <Text style={styles.settingsStyle}>style</Text>
            </TouchableOpacity>
            <View style={styles.line1}></View> */
// <View style={styles.container}>
//             <View style={[styles.header, {justifyContent:'flex-start'}]}>
//                 <TouchableOpacity 
//                 style={styles.smallButton}
//                 onPress={() => { 
//                     update();
//                     navigation.navigate('Home');
//                 }
//                 }>
//                     <MaterialIcons name="cancel" size={30} color="black" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.row}>
//                 <Text style={styles.text} >MODE:</Text>
//                 <TouchableOpacity
//                 style={styles.smallButton} 
//                 onPress={() => { setMode('square') }
//                 }>
//                     <Text>BOX</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                 style={styles.smallButton}
//                 onPress={() => { setMode('circle') }
//                 }>
//                     <Text>CIRCLE</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={styles.smallButton}
//                 onPress={() => { setMode('line') }
//                 }>
//                     <Text>LINE</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.row}>
//                 <Text style={styles.text} >BACKGROUND:</Text>
//                 <TouchableOpacity
//                 style={styles.smallButton} 
//                 onPress={() => { setBackground('SPACE') }
//                 }>
//                     <Text>SPACE</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                 style={styles.smallButton}
//                 onPress={() => { setBackground('FOREST') }
//                 }>
//                     <Text>FOREST</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                 style={styles.smallButton}
//                 onPress={() => { setBackground('CLOUDS') }
//                 }>
//                     <Text>CLOUDS</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.row}>
//                 <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
//                     <Picker style={{ flex: 1 }}
//                     prompt="INHALE"
//                     selectedValue={inhale}
//                     onValueChange={(itemValue, itemIndex) =>
//                         setInhale(itemValue)
//                     }>
//                         <Picker.Item value={1} label="1" />
//                         <Picker.Item value={2} label="2" />
//                         <Picker.Item value={3} label="3" />
//                         <Picker.Item value={4} label="4" />
//                         <Picker.Item value={5} label="5" />
//                         <Picker.Item value={6} label="6" />
//                         <Picker.Item value={7} label="7" />
//                         <Picker.Item value={8} label="8" />
//                         <Picker.Item value={9} label="9" />
//                         <Picker.Item value={10} label="10" />
//                     </Picker>
//                     <Text>EXHALE</Text>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
//                     <Picker style={{ flex: 1 }}
//                     selectedValue={exhale}
//                     onValueChange={(itemValue, itemIndex) =>
//                         setExhale(itemValue)
//                     }>
//                         <Picker.Item value={1} label="1" />
//                         <Picker.Item value={2} label="2" />
//                         <Picker.Item value={3} label="3" />
//                         <Picker.Item value={4} label="4" />
//                         <Picker.Item value={5} label="5" />
//                         <Picker.Item value={6} label="6" />
//                         <Picker.Item value={7} label="7" />
//                         <Picker.Item value={8} label="8" />
//                         <Picker.Item value={9} label="9" />
//                         <Picker.Item value={10} label="10" />
//                     </Picker>
//                     <Text>EXHALE</Text>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center' }}>
//                     <Picker style={{ flex: 1 }}
//                     selectedValue={pause}
//                     onValueChange={(itemValue, itemIndex) =>
//                         setPause(itemValue)
//                     }>
//                         <Picker.Item value={1} label="1" />
//                         <Picker.Item value={2} label="2" />
//                         <Picker.Item value={3} label="3" />
//                         <Picker.Item value={4} label="4" />
//                         <Picker.Item value={5} label="5" />
//                     </Picker>
//                     <Text>PAUSE</Text>
//                 </View>
//             </View>
//         </View>