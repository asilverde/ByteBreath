import React, {useRef, useEffect, useCallback, useContext} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated, Easing} from 'react-native';
import {scale, verticalScale, moderateScale} from "../utils/Scaling.js"

import { AntDesign, Feather} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// import styles from './Screens.styles.js';

export default function Home({ navigation }) {
    const sizeAnim = useRef(new Animated.Value(moderateScale(70))).current;
    const [fontsLoaded] = Font.useFonts({
        'PoppinsRegular': require('../assets/fonts/Poppins-Regular.ttf'),
        'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
        'PoppinsSemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
    const settings = useContext(SettingsContext);
    console.log(settings.sound);
    Animated.loop(
        Animated.sequence([
            Animated.timing(sizeAnim, {
                toValue: moderateScale(80),
                duration: 5000,
                useNativeDriver: false,
                easing: Easing.ease
            }),
            Animated.timing(sizeAnim, {
                toValue: moderateScale(70),
                duration: 5000,
                useNativeDriver: false,
                easing: Easing.ease
            })
        ])
    ).start()
    
    useEffect(() => {
        async function prepare() { await SplashScreen.preventAutoHideAsync(); }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }

    return (
        <View style={{alignItems: "center"}}onLayout={onLayoutRootView}>
            <View style={styles.row}></View>
            <View style={styles.row}>
                <View style={[styles.partition, {width: '20%'}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('About'); }}>
                        <AntDesign name="questioncircle" size={moderateScale(24, 0.25)} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Settings'); }}>
                        <Feather name="settings" size={moderateScale(24, 0.25)} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Animated.Text style={[styles.titleText, {fontSize: sizeAnim, lineHeight: sizeAnim,fontFamily:"PoppinsSemiBold"}]}>
                        byte breath
                    </Animated.Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.partition, {width: "87.5%"}]}>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.line}></View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={[styles.bodyText, {fontFamily:"PoppinsSemiBold"}]}>short tactile breathing to relieve anxiety</Text>
                </View>
                <View style={[styles.row, {height:verticalScale((1/8) * guidelineBaseHeight), justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                    <View style={[styles.partition, {width: '70%'}]}>
                        <TouchableOpacity 
                        style={styles.begin}
                        onPress={() => { navigation.navigate('Game'); }}>
                            <Text style={[styles.beginText, {fontFamily:"PoppinsMedium"}]}>begin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.row, {height:verticalScale((1/10) * guidelineBaseHeight), justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
                    <View style={[styles.partition, {width: '70%'}]}>
                        <TouchableOpacity 
                        style={styles.demo}
                        onPress={() => { navigation.navigate('Demo1'); }}>
                            <Text style={[styles.demoText, {fontFamily:"PoppinsRegular"}]}>how to play?</Text>
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
        height: verticalScale((9/10) * guidelineBaseHeight),
        width: "100%",
        alignItems: "center",
    },
    row: {
        backgroundColor: "#E5E5E5",
        height: verticalScale((1/20) * guidelineBaseHeight),
        width: "100%",
        flexDirection:"row",
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    partition: {
        flexDirection:"row", 
        justifyContent: 'space-evenly',
        alignItems: "flex-start",
    },
    title: {
        width: scale((3/4) * guidelineBaseWidth),
        height: verticalScale((3/10) * guidelineBaseHeight),
        justifyContent: 'flex-end',
    },
    titleText: {
        fontSize: moderateScale(70),
        lineHeight: moderateScale(70),
        paddingTop: "10%",
    },
    body: {
        width: moderateScale((1/2) * guidelineBaseWidth),
        height: moderateScale((7/20) * guidelineBaseHeight),
        justifyContent: 'flex-end',
    },
    bodyText: {
        fontSize: moderateScale(32),
        lineHeight: moderateScale(40),
    },
    begin: {
        width: moderateScale((1/2) * guidelineBaseWidth), 
        height: moderateScale((1/12) * guidelineBaseHeight),
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
    demo: {
        width: "50%", 
        alignItems: "center"
    },
    demoText: {
        fontSize: moderateScale(18),
        lineHeight: moderateScale(40),
        /* or 175% */
        color: "gray"

    },
    line: {
        width: scale((15/20) * guidelineBaseWidth),
        height: 10,
        borderRadius: 20,
        backgroundColor: "black",
    },
    dot: {
        width: 12,
        height: 12,

        backgroundColor: "black",
        borderRadius: 50
    },
})
// import React, {useRef, useCallback} from 'react';
// import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

// import { AntDesign, Feather} from '@expo/vector-icons';
// import { Audio } from 'expo-av';

// import styles from './Screens.styles.js';

// export default function Home({ navigation }) {
//     return (
//         <View style={homeStyle.container}>
//             <TouchableOpacity
//             style={{
//                 position: "absolute",
//                 left: "75.85%",
//                 right: "14.49%",
//                 top: "3.67%",
                
//                 background: "#000000"
//             }}
//             onPress={() => {
//                 navigation.navigate('About');
//             }
//             }>
//                 <AntDesign name="questioncircle" size={24} color="gray" />
//             </TouchableOpacity>
//             <TouchableOpacity
//             style={{
//                 position: "absolute",
//                 left: "88.19%",
//                 right: "3.16%",
//                 top: "3.79%",
                
//                 background: "#000000"
//             }}
//             onPress={() => {
//                 navigation.navigate('Settings');
//             }
//             }>
//                 <Feather name="settings" size={24} color="gray" />
//             </TouchableOpacity>
//             <View style={homeStyle.title}>
//                 <Text style={[homeStyle.titleText, {fontFamily: 'Poppins_600SemiBold'}]}>byte breath</Text>
//             </View>
//             <View style = {styles.homeLine}></View>
//             <View style = {[styles.ellipse, {left:"20%", top: "42%"}]}></View>
//             <View style = {[styles.ellipse, {left:"15%", top: "42%"}]}></View>
//             <View style={styles.bodyBox}>
//                 <Text style={styles.bodyText}>short tactile breathing to relieve anxiety</Text>
//             </View>
//             <TouchableOpacity 
//             style={styles.beginButton}
//             onPress={() => {
//                 navigation.navigate('Game');
//             }}>
//                 <Text style={styles.beginText}>begin</Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//             style={styles.demoTextBox}
//             onPress={() => {
//                 navigation.navigate('Demo1');
//             }}>
//                 <Text style={styles.demoText}>how to play?</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const homeStyle = StyleSheet.create({
//     container: {
//         backgroundColor: "#E5E5E5",
//         height: '100%',
//         width: '100%',
//         alignItems: 'center',
//         fontFamily: ' Poppins'
//     },
//     title: {
//         width: "80%",
//         height: "30%",

//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     titleText: {
//         fontFamily: ' Poppins',
//         fontSize: 80,
//         lineHeight: 70,
//         display: 'flex',
//         alignItems: "center",
//         justifyContent: 'center'
//     },
// })