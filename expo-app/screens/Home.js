import React, {useRef, useEffect, useCallback, useContext} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated, Easing} from 'react-native';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"
import { useSelector, useDispatch } from 'react-redux';

import { AntDesign, Feather} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// import styles from './Screens.styles.js';

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    return (
        <View style={{alignItems: "center"}} >
            <View style={[styles.row, {height: verticalScale((1/25) * baseHeight)}]}></View>
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
                    <Text style={[styles.titleText, {fontFamily:"PoppinsSemiBold"}]}>
                        byte breath
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.partition, {justifyContent:"space-between", width: "87.5%"}]}>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.line}></View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={[styles.bodyText, {fontFamily:"PoppinsSemiBold"}]}>short tactile breathing to relieve anxiety</Text>
                </View>
                <View style={[styles.row, {height:verticalScale((1/8) * baseHeight), justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                    <View style={[styles.partition, {width: '70%'}]}>
                        <TouchableOpacity 
                        style={styles.begin}
                        onPress={() => { 
                            navigation.navigate("Game");
                         }}>
                            <Text style={[styles.beginText, {fontFamily:"PoppinsMedium"}]}>begin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.row, {height:verticalScale((1/10) * baseHeight), justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
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
        height: verticalScale((9/10) * baseHeight),
        width: "100%",
        alignItems: "center",
    },
    row: {
        backgroundColor: "#E5E5E5",
        height: verticalScale((1/20) * baseHeight),
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
        width: scale((3/4) * baseWidth),
        height: verticalScale((3/10) * baseHeight),
        justifyContent: 'flex-end',
    },
    titleText: {
        fontSize: moderateScale(70),
        lineHeight: moderateScale(70),
        paddingTop: "10%",
    },
    body: {
        width: moderateScale((1/2) * baseWidth),
        height: moderateScale((7/20) * baseHeight),
        justifyContent: 'flex-end',
    },
    bodyText: {
        fontSize: moderateScale(32),
        lineHeight: moderateScale(40),
    },
    begin: {
        width: moderateScale((1/2) * baseWidth),
        justifyContent: "flex-start",
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
        width: scale((15/20) * baseWidth),
        height: moderateScale((1/60) * baseHeight),
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "black",
    },
    dot: {
        width: moderateScale(12),
        height: moderateScale(12),

        backgroundColor: "black",
        borderRadius: 50
    },
})