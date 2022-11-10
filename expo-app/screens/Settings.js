import React, {useState, useRef, useEffect} from 'react';
import { Icon, ImageBackground, Animated, LayoutAnimation, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../redux/actions/breathSettings';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import {moderateScale} from "../utils/Scaling.js"
import styles from './styles/Settings.styles';

export default function Settings({ navigation }) {
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    const [style, setStyle] = useState(settings.style);
    const [scene, setScene] = useState(settings.scene);
    const [sound, setSound] = useState(settings.sound);

    const update = () => {
        const newSettings = {
            inhale: 5,   
            pause: 2, 
            exhale: 5,  
            style: style, 
            scene: scene,
            sound: sound,
        }
        dispatch( updateSettings(newSettings) );
    };

    const Accordion = ({ title, current, func, options, background}) => {
        const [open, setOpen] = useState(false);
        const animatedController = useRef(new Animated.Value(0)).current;
    
        const bodyHeight = animatedController.interpolate({
            inputRange: [0, 1],
            outputRange: [0, moderateScale(80)],
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
          <View style={{width: "100%", height: "22%"}}>
            <View style={[styles.row, { width: "85%", height: "40%",
                          justifyContent: 'space-evenly', alignItems: "flex-end",}]}>
                    <TouchableOpacity style={[styles.partition, {justifyContent: 'flex-start', width: "80%"}]} onPressIn={toggleOpen} activeOpacity={0.0}>
                        <Text style={[styles.settingTitle]}>{title}</Text>
                        <Text style={styles.currentDisplay}>{current}</Text>
                    </TouchableOpacity>
            </View>
            <View style={[styles.line, {height: "2%"}]}></View>
            <Animated.View style={[styles.settingsRow, {overflow:"hidden", height: bodyHeight }]}>
                {options.map((choice, index) =>
                    <ImageBackground key={index} source={background[index]}>
                        <TouchableOpacity
                        key={index}
                        style={[styles.optionButton, { 
                        borderWidth: (choice == current) ? 2 : 0.5}]} 
                        onPress={() => { 
                            func(choice) 
                        }}>
                        </TouchableOpacity>
                    </ImageBackground>
                )}
            </Animated.View>
          </View>
        );
    };

    return (
        <View>
            <View style={styles.row}></View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Home') } }>
                        <AntDesign name="close" size={moderateScale(25, 0.25)} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.partition, {width: '20%', justifyContent: 'space-evenly'}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('About'); }}>
                        <AntDesign name="questioncircle" size={moderateScale(25, 0.25)} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Settings'); }}>
                        <Feather name="settings" size={moderateScale(25, 0.25)} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={[styles.row, {height: "10%", alignItems: "flex-end"}]}>
                    <Text style={[styles.headerText, {fontFamily:'PoppinsSemiBold', padding: moderateScale(20)}]}>settings</Text>
                </View>
                <View style={[styles.row, { height: "3%", alignItems: "flex-start"}]}>
                    <View style={[styles.partition, {width: "87.5%", justifyContent:"space-between"}]}>
                        <View style = {styles.line}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                    </View>
                </View>

                <Accordion title="style" current={style} func={setStyle} 
                        options={["box", "line", "triangle"]} 
                        background={[require('../assets/settings-icons/box.png'), require('../assets/settings-icons/line.png'), require('../assets/settings-icons/circle.png')]}>
                </Accordion>
                <Accordion title="scene" current={scene} func={setScene} 
                        options={["space", "nature", "cloud"]} background={[require('../assets/backgrounds/space2.png'), require('../assets/backgrounds/nature.jpg'), require('../assets/backgrounds/cloud.jpg')]}>
                </Accordion>
                <Accordion title="sound" current={sound} func={setSound} 
                        options={["breath", "om", "wave"]} background={[require('../assets/settings-icons/breath.png'), require('../assets/settings-icons/breath.png'), require('../assets/settings-icons/wave.png')]}>
                </Accordion>

                <View style={[styles.row, {height:"12%", justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                    <View style={[styles.partition, {width: '70%', justifyContent: 'space-evenly'}]}>
                        <TouchableOpacity 
                        style={styles.begin}
                        onPress={() => { 
                            update();
                            navigation.navigate("Game");
                         }}>
                            <Text style={[styles.beginText, {fontFamily:"PoppinsMedium"}]}>begin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}