import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"
import { Entypo } from '@expo/vector-icons'; 
export default function End({ route, navigation }) {
    const {breathCount} = route.params;
    const endText = `Completed Breaths: ${breathCount}`;
    
    return (
        <View style={{alignItems: "center"}} >
            <View style={[styles.row, {height: verticalScale((1/25) * baseHeight)}]}></View>
            <View style={styles.row}></View>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, {fontFamily:"PoppinsSemiBold"}]}>
                        Good Work!
                    </Text>
                </View>
                <View style={styles.row}></View>
                <View style={styles.body}>
                    <Text style={[styles.bodyText, {fontFamily:"PoppinsSemiBold"}]}>repeat the exercise as many times as needed</Text>
                </View>
                <View style={[styles.row, {height:verticalScale((1/8) * baseHeight), justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                    <View style={[styles.partition, {width: '70%'}]}>
                        <TouchableOpacity 
                        style={styles.begin}
                        onPress={() => { 
                            navigation.navigate("Home");
                         }}>
                            <Entypo name="home" size={32} color="white" />
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
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: moderateScale(30),
        lineHeight: moderateScale(40),
    },
    begin: {
        width: moderateScale((1/3) * baseWidth), 
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