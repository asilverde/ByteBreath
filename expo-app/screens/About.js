import React, {useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';
import { Audio } from 'expo-av';

import styles from './About.styles.js';

function About({ navigation }) {
    return (
        <View style={styles.container}>
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
            <TouchableOpacity
            style={{
                position: "absolute",
                left: "75.85%",
                right: "14.49%",
                top: "3.67%",
                
                background: "#000000"
            }}
            onPress={() => {
                navigation.navigate('About');
            }
            }>
                <AntDesign name="questioncircle" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
            style={{
                position: "absolute",
                left: "88.19%",
                right: "3.16%",
                top: "3.79%",
                
                background: "#000000"
            }}
            onPress={() => {
                navigation.navigate('Settings');
            }
            }>
                <Feather name="settings" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={[styles.header, {top: 75}]}>
                <Text style={{fontWeight: "800"}}>what </Text>
                <Text style={{fontSize: "30"}}>is this? </Text>
            </Text>
            <View style={[styles.rectangle1, {top: 140}]}></View>
            <View style={[styles.ellipse1, {top: 140, left: 310}]}></View>
            <View style={[styles.ellipse1, {top: 140, left: 325}]}></View>
            <View style={[styles.ellipse1, {top: 140, left: 340}]}></View>
            <Text style={[styles.textbox, {top: 165}]}>
                A simple & interactive deep breathing excercise to help you lower anxiety & stress.
            </Text>

            <Text style={[styles.header, {top: 250}]}>
                <Text style={{fontWeight: "800"}}>how </Text>
                <Text style={{fontSize: "30"}}>does it work? </Text>
            </Text>
            <View style={[styles.rectangle1, {top: 315}]}></View>
            <View style={[styles.ellipse1, {top: 315, left: 310}]}></View>
            <View style={[styles.ellipse1, {top: 315, left: 325}]}></View>
            <View style={[styles.ellipse1, {top: 315, left: 340}]}></View>
            <Text style={[styles.textbox, {top: 340}]}>
                The exercise combines your senses on one task so you can focus and simplify your thoughts
            </Text>


            <Text style={[styles.header, {top: 425}]}>
                <Text style={{fontWeight: "800"}}>who </Text>
                <Text style={{fontSize: "30"}}>should care? </Text>
            </Text>
            <View style={[styles.rectangle1, {top: 490}]}></View>
            <View style={[styles.ellipse1, {top: 490, left: 310}]}></View>
            <View style={[styles.ellipse1, {top: 490, left: 325}]}></View>
            <View style={[styles.ellipse1, {top: 490, left: 340}]}></View>
            <Text style={[styles.textbox, {top: 515}]}>
            Anyone who has said “I’ve tried to meditate but I can’t focus”
            </Text>
        </View>
    );
}

export default About