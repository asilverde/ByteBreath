import React, {useState, useRef, useEffect} from 'react';
import { Icon, Animated, LayoutAnimation, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../redux/actions/breathSettings';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"

const defaultSettings = {
    "style": "box",
    "scene": "box",
    "sound": "box",
}

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

    const Accordion = ({ title, current, func, options, offset}) => {
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
          <View style={{width: "100%", height: verticalScale((1/5.5) * baseHeight)}}>
            <View style={[styles.row, { width: scale((8.5/10) * baseWidth), height: verticalScale((1/15) * baseHeight),
                          justifyContent: 'space-evenly', alignItems: "flex-end",}]}>
                <View style={[styles.partition, {justifyContent: 'space-between', width: "50%"}]}>
                    <TouchableOpacity onPressIn={toggleOpen} activeOpacity={0.0}>
                        <Text style={[styles.settingTitle]}>{title}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.partition, {width: "20%", paddingTop:scale(10)}]}>
                    <Text style={styles.currentDisplay}>{current}</Text>
                </View>
            </View>
            <View style={[styles.line, {height: scale((1/100) * baseHeight)}]}></View>
            <Animated.View style={[styles.settingsRow, {overflow:"hidden", height: bodyHeight }]}>
                {options.map((choice, index) =>
                    <TouchableOpacity
                    key={index}
                    style={[styles.optionButton, {borderWidth: (choice == current) ? 2.5 : 0.5}]} 
                    onPress={() => { 
                        func(choice) 
                    }}>
                        <Text>{choice}</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
          </View>
        );
    };

    return (
        <View>
            <View style={[styles.row, {height: verticalScale((1/25) * baseHeight)}]}></View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
                    <TouchableOpacity onPress={() => { update(); navigation.navigate('Home') } }>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.partition, {width: '20%', justifyContent: 'space-evenly'}]}>
                    <TouchableOpacity onPress={() => { update(); navigation.navigate('About'); }}>
                        <AntDesign name="questioncircle" size={moderateScale(24, 0.25)} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { update(); navigation.navigate('Settings'); }}>
                        <Feather name="settings" size={moderateScale(24, 0.25)} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.row, {height: verticalScale((1/40) * baseHeight)}]}></View>
            <View style={styles.container}>
                <View style={[styles.row, {height: verticalScale((1/10) * baseHeight), alignItems: "flex-end"}]}>
                    <Text style={[styles.headerText, {fontFamily:'PoppinsSemiBold', padding: moderateScale(10)}]}>settings</Text>
                </View>
                <View style={[styles.row, {height: verticalScale((1/15) * baseHeight), alignItems: "flex-start"}]}>
                    <View style={[styles.partition, {width: "87.5%", justifyContent:"space-between"}]}>
                        <View style = {styles.line}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                    </View>
                </View>

                <Accordion title="style" current={style} func={setStyle} 
                        options={["box", "line", "triangle"]} offset={160}>
                </Accordion>
                <Accordion title="scene" current={scene} func={setScene} 
                        options={["space", "nature", "cloud"]} offset={280}>
                </Accordion>
                <Accordion title="sound" current={sound} func={setSound} 
                        options={["breath", "om", "wave"]} offset={400}>
                </Accordion>

                <View style={[styles.row, {justifyContent:"flex-start", height:verticalScale((1/9) * baseHeight), justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                    <View style={[styles.partition, {width: '70%', }]}>
                        <TouchableOpacity 
                        style={styles.beginButton}
                        onPress={() => { update(); navigation.navigate('Game'); }}>
                            <Text style={[styles.beginText, {fontFamily:"PoppinsMedium"}]}>begin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        height: verticalScale((9/10) * baseHeight),
        width: "100%",
        alignItems: "center",
    },
    row: {
        backgroundColor: "#E5E5E5",
        height: verticalScale((1/20) * baseHeight),
        width: "100%",
        flexDirection:"row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    partition: {
        flexDirection:"row", 
        justifyContent: 'space-evenly',
        alignItems: "flex-start",
    },
    header: {
        width: scale((8.5/10) * baseWidth),
        height: moderateScale((8/100) * baseHeight),
        justifyContent: 'flex-start',
        paddingTop: scale(20)
    },
    headerText: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(40),
        fontFamily: "PoppinsSemiBold"
    },
    settingTitle: {
        fontSize: moderateScale(30),
        lineHeight: moderateScale(60),
        fontFamily: "PoppinsMedium"
    },
    currentDisplay: {
        fontSize: moderateScale(15),
        lineHeight: moderateScale(40),
        fontFamily: "PoppinsRegular"
    },
    settingsRow: {
        width: "80%",
        height: "100%",
        flexDirection:"row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    optionButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width:moderateScale(60, 0.25),
        height:moderateScale(60, 0.25),
        borderColor: "black",
        borderWidth: 0.5,
    },
    line: {
        width: scale((15/20) * baseWidth),
        height: moderateScale((1/60) * baseHeight),
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#7A7B7C",
    },
    beginButton: {
        width: moderateScale((1/2) * baseWidth), 
        height: moderateScale((1/12) * baseHeight),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        borderRadius: 38,
    },
    beginText: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(60),
        letterSpacing: 2,
        color: "white"
    },
    dot: {
        width: moderateScale(12),
        height: moderateScale(12),

        backgroundColor: "#7A7B7C",
        borderRadius: 50
    },
})
