import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import styles from './Screens.styles.js';

export default function Demo2({ navigation }) {
    const [touchX, setTouchX] = useState(0);

    return(
        <View onTouchStart={e => setTouchX(e.nativeEvent.pageX)}
              onTouchEnd={e => {
                  if (touchX - e.nativeEvent.pageX > 20)
                    navigation.navigate('Demo3');
                if (touchX - e.nativeEvent.pageX < -20)
                    navigation.navigate('Demo1');
              }}
              style={styles.container}>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    left: "2.85%",
                    right: "14.49%",
                    top: "3.00%"

                }}
                onPress={() => {
                    navigation.navigate('Home');
                }
                }>
                <MaterialIcons name="cancel" size={32} color="gray" />
            </TouchableOpacity>
            <View style={styles.demoStage}>
                <Text style={styles.titleText}>2</Text>
                <View style={[styles.ellipse, {backgroundColor:"black", left:50, top:65}]}></View>
                <View style={[styles.ellipse, {backgroundColor:"black", left:50, top:45}]}></View>
            </View>
            <View style={[styles.bodyBox, {width: 380, top:220}]}>
                <Text style={styles.bodyText}>track the orb as it moves along the axis.</Text>
            </View>
            <View style={[styles.demoEllipse, {left:65, top:410}]}></View>
            <View style={styles.demoVisual}>
                <Svg width="100" height="150" viewBox="0 0 139 215" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </View>
            <View style={[styles.ellipse, {backgroundColor:"white", left:"45%", top:"95%"}]}></View>
            <View style={[styles.ellipse, {backgroundColor:"black", left:"50%", top:"95%"}]}></View>
            <View style={[styles.ellipse, {backgroundColor:"white", left:"55%", top:"95%"}]}></View>
        </View>
    );
}