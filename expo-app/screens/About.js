import React, {useRef, useEffect, useState, useCallback} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"
import styles from './styles/About.styles';

import { AntDesign, Feather} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function About({ navigation }) {
    return (
        <View style={{alignItems: "center"}} >
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
                <View style={styles.row}></View>
                <Text style={styles.header}>
                    <Text style={styles.largeHeaderText}>what </Text>
                    <Text style={styles.smallHeaderText}>is this? </Text>
                </Text>
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                    <View style={[styles.partition, {width: "87.5%"}]}>
                        <View style = {styles.line}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                        <View style = {styles.dot}></View>
                    </View>
                </View>
                <Text style={[styles.aboutText]}>
                    A simple & interactive deep breathing exercise to help you lower anxiety & stress.
                </Text>

                <Text style={styles.header}>
                    <Text style={styles.largeHeaderText}>how </Text>
                    <Text style={styles.smallHeaderText}>does it work? </Text>
                </Text>
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
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
                <Text style={styles.header}>
                    <Text style={styles.largeHeaderText}>who </Text>
                    <Text style={styles.smallHeaderText}>should care? </Text>
                </Text>
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
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


// <View>
        // <View style={styles.row}></View>
        // <View style={[styles.row, {backgroundColor: "blue", justifyContent: 'space-between'}]}>
        //     <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
        //         <TouchableOpacity onPress={() => { navigation.navigate('Home') } }>
        //             <AntDesign name="close" size={moderateScale(25, 0.25)} color="black" />
        //         </TouchableOpacity>
        //     </View>
        //     <View style={[styles.partition, {width: '20%', justifyContent: 'space-evenly'}]}>
        //         <TouchableOpacity onPress={() => { navigation.navigate('About'); }}>
        //             <AntDesign name="questioncircle" size={moderateScale(25, 0.25)} color="black" />
        //         </TouchableOpacity>
        //         <TouchableOpacity onPress={() => { navigation.navigate('Settings'); }}>
        //             <Feather name="settings" size={moderateScale(25, 0.25)} color="black" />
        //         </TouchableOpacity>
        //     </View>
        // </View>
//             <View style={styles.row}></View>
//             <View style={styles.container}>
                // <Text style={styles.header}>
                //     <Text style={styles.largeHeaderText}>what </Text>
                //     <Text style={styles.smallHeaderText}>is this? </Text>
                // </Text>
                // <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                //     <View style={[styles.partition, {width: "87.5%"}]}>
                //         <View style = {styles.line}></View>
                //         <View style = {styles.dot}></View>
                //         <View style = {styles.dot}></View>
                //         <View style = {styles.dot}></View>
                //     </View>
                // </View>
                // <Text style={[styles.aboutText]}>
                //     A simple & interactive deep breathing exercise to help you lower anxiety & stress.
                // </Text>

                // <Text style={styles.header}>
                //     <Text style={styles.largeHeaderText}>how </Text>
                //     <Text style={styles.smallHeaderText}>does it work? </Text>
                // </Text>
                // <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                //     <View style={[styles.partition, {width: "87.5%"}]}>
                //         <View style = {styles.line}></View>
                //         <View style = {styles.dot}></View>
                //         <View style = {styles.dot}></View>
                //         <View style = {styles.dot}></View>
                //     </View>
                // </View>
                // <Text style={styles.aboutText}>
                //     The exercise combines your senses on one task so you can focus and simplify your thoughts
                // </Text>
                // <Text style={styles.header}>
                //     <Text style={styles.largeHeaderText}>who </Text>
                //     <Text style={styles.smallHeaderText}>should care? </Text>
                // </Text>
                // <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                //     <View style={[styles.partition, {width: "87.5%"}]}>
                //         <View style = {styles.line}></View>
                //         <View style = {styles.dot}></View>
                //         <View style = {styles.dot}></View>
                //         <View style = {styles.dot}></View>
                //     </View>
                // </View>
                // <Text style={styles.aboutText}>
                //     Anyone who has said “I’ve tried to meditate but I can’t focus”
                // </Text>
//             </View>
//         </View>