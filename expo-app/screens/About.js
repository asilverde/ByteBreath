import React, {useRef, useEffect, useState, useCallback} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"
import makeStyles from './Screens.styles.js';

import { AntDesign, Feather} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function About({ navigation }) {

    const {fontScale} = useWindowDimensions(); 
    const styles = makeStyles(fontScale);

    return (
        <View>
            <View style={styles.row}></View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Home') } }>
                        <AntDesign name="close" size={"25%"} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.partition, {width: '20%', justifyContent: 'space-evenly'}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('About'); }}>
                        <AntDesign name="questioncircle" size={"25%"} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Settings'); }}>
                        <Feather name="settings" size={"25%"} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.row, {height: verticalScale((1/40) * baseHeight)}]}></View>
            <View style={styles.container}>
                <Text style={styles.aboutHeader}>
                    <Text style={styles.aboutHeaderText}>what </Text>
                    <Text style={[styles.aboutHeaderText, {fontSize: 25 / fontScale}]}>is this? </Text>
                </Text>
                <View style={styles.row}>
                    <View style={[styles.partition, {width: "87.5%"}]}>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.line}></View>
                    </View>
                </View>
                <Text style={[styles.aboutText]}>
                    A simple & interactive deep breathing exercise to help you lower anxiety & stress.
                </Text>

                <Text style={styles.aboutHeader}>
                    <Text style={[styles.aboutHeaderText, {fontSize: scale(40), }]}>how </Text>
                    <Text style={[styles.aboutHeaderText, {fontSize: scale(25)}]}>does it work? </Text>
                </Text>
                <View style={styles.row}>
                    <View style={[styles.partition, {width: "87.5%"}]}>
                        <View style = {styles.line}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                    </View>
                </View>
                <Text style={styles.aboutText}>
                    The exercise combines your senses on one task so you can focus and simplify your thoughts
                </Text>
                <Text style={styles.aboutHeader}>
                    <Text style={[styles.aboutHeaderText, {fontSize: scale(40), }]}>who </Text>
                    <Text style={[styles.aboutHeaderText, {fontSize: scale(25)}]}>should care? </Text>
                </Text>
                <View style={styles.row}>
                    <View style={[styles.partition, {width: "87.5%"}]}>
                        <View style = {styles.line}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                    </View>
                </View>
                <Text style={styles.aboutText}>
                    Anyone who has said “I’ve tried to meditate but I can’t focus”
                </Text>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#E5E5E5",
//         height: verticalScale((9/10) * baseHeight),
//         width: "100%",
//         alignItems: "center",
//     },
//     row: {
//         backgroundColor: "#E5E5E5",
//         height: verticalScale((1/20) * baseHeight),
//         width: "100%",
//         flexDirection:"row",
//         justifyContent: 'flex-start',
//         alignItems: "center",
//     },
//     partition: {
//         flexDirection:"row", 
//         justifyContent: 'space-between',
//         alignItems: "flex-start",
//     },
//     header: {
//         width: scale((8.5/10) * baseWidth),
//         height: moderateScale((8/100) * baseHeight),
//         justifyContent: 'flex-start',
//         paddingTop: scale(20)
//     },
//     headerText: {
//         fontSize: moderateScale(40),
//         lineHeight: moderateScale(40),
//         fontFamily: "PoppinsSemiBold"
//     },
//     textbox: {
//         height: verticalScale((3/20) * baseHeight),
//         width: scale((17/20) * baseWidth),
//         fontFamily: "PoppinsRegular",
//         fontSize: moderateScale(18),
//         lineHeight: moderateScale(25)
//     },
//     body: {
//         width: moderateScale((1/2) * baseWidth),
//         height: moderateScale((7/20) * baseHeight),
//         justifyContent: 'flex-end',
//     },
//     bodyText: {
//         fontSize: moderateScale(32),
//         lineHeight: moderateScale(40),
//     },
//     begin: {
//         width: moderateScale((1/2) * baseWidth), 
//         height: moderateScale((1/12) * baseHeight),
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#000000",
//         borderRadius: 38,
//     },
//     beginText: {
//         fontSize: moderateScale(40),
//         lineHeight: moderateScale(60),
//         letterSpacing: 2,
//         color: "white"
//     },
//     demo: {
//         width: "50%", 
//         alignItems: "center"
//     },
//     demoText: {
//         fontSize: moderateScale(18),
//         lineHeight: moderateScale(40),
//         /* or 175% */
//         color: "gray"

//     },
//     line: {
//         width: scale((15/20) * baseWidth),
//         height: moderateScale((1/60) * baseHeight),
//         borderTopRightRadius: 50,
//         borderBottomRightRadius: 50,
//         backgroundColor: "#7A7B7C",
//     },
//     dot: {
//         width: moderateScale(12),
//         height: moderateScale(12),

//         backgroundColor: "#7A7B7C",
//         borderRadius: 50
//     },
// })
