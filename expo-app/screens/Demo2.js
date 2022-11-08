import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing} from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"

export default function Demo2({ navigation }) {
    const [touchX, setTouchX] = useState(0);
    const anim = useRef(new Animated.Value(0)).current;

    Animated.loop(
        Animated.sequence([
            Animated.timing(anim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            }),
            Animated.timing(anim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false
            })
        ])
    ).start()

    return(
        <View onTouchStart={e => setTouchX(e.nativeEvent.pageX)}
              onTouchEnd={e => {
                  if (touchX - e.nativeEvent.pageX > 20)
                    navigation.navigate('Demo3');
                if (touchX - e.nativeEvent.pageX < -20)
                    navigation.navigate('Demo1');
              }}>
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
                        <Text style={styles.title}>2</Text>
                        <View style={{height: moderateScale(40), width:"5%", flex:"column", justifyContent: "space-between"}}>
                            <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                            <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                        </View>
                  </View>
                  <View style={styles.body}>
                      <Text style={styles.bodyText}>track the orb as it moves along it's axis</Text>
                  </View>
                  <Animated.View style={[styles.demoVisual, 
                        {left: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [scale(-50), scale(100)],
                        })
                    }]}>
                      <View style={styles.demoEllipse}></View>
                        <Svg width={moderateScale(150)} height={moderateScale(250)} viewBox="0 0 150 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M0 98.4839H139V166.452H0V98.4839Z" fill="black"/>
                            <Path d="M0 15.2581H26.41V110.968H0V15.2581Z" fill="black"/>
                            <Path d="M0 15.2581H26.41V110.968H0V15.2581Z" fill="black"/>
                            <Path d="M37.53 83.2258H63.94V117.903H37.53V83.2258Z" fill="black"/>
                            <Path d="M75.06 83.2258H101.47V117.903H75.06V83.2258Z" fill="black"/>
                            <Path d="M112.59 83.2258H139V117.903H112.59V83.2258Z" fill="black"/>
                            <Path d="M0 160.903C0 190.78 24.2706 215 54.21 215H84.79C114.729 215 139 190.78 139 160.903H0Z" fill="black"/>
                            <Path d="M37.53 81.1452C37.53 73.8675 43.4421 67.9677 50.735 67.9677C58.0279 67.9677 63.94 73.8675 63.94 81.1452V83.2258H37.53V81.1452Z" fill="black"/>
                            <Path d="M0 13.1774C0 5.89973 5.91208 0 13.205 0C20.4979 0 26.41 5.89973 26.41 13.1774V15.2581H0V13.1774Z" fill="black"/>
                            <Path d="M112.59 81.1452C112.59 73.8675 118.502 67.9677 125.795 67.9677C133.088 67.9677 139 73.8675 139 81.1452V83.2258H112.59V81.1452Z" fill="black"/>
                            <Path d="M75.06 81.1452C75.06 73.8675 80.9721 67.9677 88.265 67.9677C95.5579 67.9677 101.47 73.8675 101.47 81.1452V83.2258H75.06V81.1452Z" fill="black"/>
                        </Svg>
                  </Animated.View>
              </View>
              <View style={[styles.row, {height: verticalScale((1/10) * baseHeight), justifyContent: 'center'}]}>
                    <View style={[styles.partition, {width: "20%", justifyContent: 'space-evenly'}]}>
                        <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                        <View style={[styles.dot, {backgroundColor:"black"}]}></View>
                        <View style={[styles.dot, {backgroundColor:"white"}]}></View>
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
        width: moderateScale((1/2) * baseWidth),
        height: moderateScale((2/10) * baseHeight),
        justifyContent: 'flex-end',
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
    demoEllipse: {
        width: moderateScale(70),
        height: moderateScale(70),
        left: moderateScale(-22),
        top: moderateScale(40),
        backgroundColor: "white",
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 2
    },
    demoVisual: {
        display: 'flex',
        justifyContent: 'center',
        color: "#000000"
    },
})
