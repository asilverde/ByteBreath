import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing} from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"

export default function Demo3({ navigation }) {
    const [touchX, setTouchX] = useState(0);

    return(
        <View onTouchStart={e => setTouchX(e.nativeEvent.pageX)}
              onTouchEnd={e => {
                  if (touchX - e.nativeEvent.pageX < -20)
                    navigation.navigate('Demo2');
              }}
              style={styles.container}>
            <View style={[styles.row, {height: verticalScale((1/25) * baseHeight)}]}></View>
                <View style={[styles.row, {justifyContent: 'space-between', }]}>
                    <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home') } }>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.partition, {width: '20%', justifyContent: 'space-evenly'}]}>
                        <TouchableOpacity onPress={() => { navigation.navigate('About'); }}>
                            <AntDesign name="questioncircle" size={moderateScale(24, 0.25)} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Settings'); }}>
                            <Feather name="settings" size={moderateScale(24, 0.25)} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.container}>
                    <View style={styles.stage}>
                            <Text style={styles.title}>3</Text>
                            <View style={{height: moderateScale(60), top:moderateScale(-5), width:"5%", flex:"column", justifyContent: "space-between"}}>
                                <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                                <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                                <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                            </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyText}>synchronize your breath to movement</Text>
                    </View>
                    <View style={[styles.row, {height:verticalScale((1/8) * baseHeight), justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                        <View style={[styles.partition, {width: '80%'}]}>
                            <TouchableOpacity 
                            style={styles.begin}
                            onPress={() => { 
                                navigation.navigate("Game");
                            }}>
                                <Text style={[styles.beginText, {fontFamily:"PoppinsMedium"}]}>begin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styles.row, {height: verticalScale((1/10) * baseHeight), justifyContent: 'center'}]}>
                    <View style={[styles.partition, {width: "20%", justifyContent: 'space-evenly'}]}>
                        <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                        <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                        <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                    </View>
                </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        height: verticalScale((8.25/10) * baseHeight),
        width: "100%",
        alignItems: "space-evenly",
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
    stage: {
        backgroundColor: "#E5E5E5",
        height: verticalScale((3/20) * baseHeight),
        width: "70%",
        flexDirection:"row",
        justifyContent: 'flex-start',
        alignItems: "flex-end"
    },
    partition: {
        flexDirection:"row", 
        justifyContent: 'space-evenly',
        alignItems: "flex-start",
    },
    title: {
        fontSize: moderateScale(90),
        height: moderateScale(95),
        fontFamily: "PoppinsMedium",
    },
    body: {
        width: moderateScale((1.1/2) * baseWidth),
        height: moderateScale((4/10) * baseHeight),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    bodyText: {
        fontSize: moderateScale(28),
        lineHeight: moderateScale(36),
        fontFamily: "PoppinsRegular",
    },
    line: {
        width: scale((15/20) * baseWidth),
        height: moderateScale((1/60) * baseHeight),
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#7A7B7C",
    },
    dot: {
        width: moderateScale(12),
        height: moderateScale(12),

        backgroundColor: "#7A7B7C",
        borderRadius: 50,
        borderWidth: 2,
    },
    begin: {
        width: moderateScale((1/2) * baseWidth), 
        height: moderateScale((1/12) * baseHeight),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 38,
    },
    beginText: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(60),
        letterSpacing: 2,
        color: "white"
    },
})

