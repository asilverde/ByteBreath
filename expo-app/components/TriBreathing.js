import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ImageBackground, View, Animated, Easing, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"

import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function TriBreathing ( {endSession, audioFile} ) {

    const height = (Dimensions.get('window').height / 2) * 0.6;
    const width = (Dimensions.get('window').width / 2) * 0.6;
    const translation = useRef(new Animated.ValueXY({x:0, y:height})).current;
    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState([[translation.y, -height / 2], [translation.x, -width], [translation.y, -height / 2], [translation.x, width], [translation.y, height], [translation.x, 0]]);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );
    const [hasStarted, setHasStarted] = useState(0);
    const [score, setScore] = useState(0);
    const [timestamp, setTimestamp] = useState(0);

    const breathingLength = [settings.inhale * 1000, settings.pause * 1000, 
                             settings.exhale * 1000];
    const breathingPath = ["Inhale", "Pause", "Exhale"];
    const [currentBreathState, setCurrentBreathState] = useState(0);
    const [currentBreathLength, setCurrentBreathLength] = useState(breathingLength[0]);

    const audio = useRef(new Audio.Sound());
    const backgroundURI = (settings.scene == 'space') ? require('../assets/backgrounds/space.jpg') : ((settings.scene == 'nature') ? require('../assets/backgrounds/nature.jpg') : require('../assets/backgrounds/cloud.jpg'))

    const pythagorean = (x_dist, y_dist) => {
        return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
    }

    const getScoreView = () => {
        let colors = ["black", "black", "black", "black", "black"];
        for (var i = 0; i < score; i++) {
            colors[i] = "#777777";
        }
        return colors;
    }

    async function loadSound() {
        await audio.current.unloadAsync();
        audio.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await audio.current.loadAsync( audioFile, 
            {
                progressUpdateIntervalMillis: 20,
                positionMillis: 0,
                shouldPlay: false,
                rate: 1.0,
                shouldCorrectPitch: false,
                volume: 1.0,
                isMuted: false,
                isLooping: false,
            }, 
            false
        );
    }

    const playAudio = async() => {
        try {
            const result = await audio.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === false) {
                    await audio.current.playAsync();
                    setIsFollowing(true);
                }
            }
        } catch (error) {}
    }

    const pauseAudio = async() => {
        try {
            const result = await audio.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === true) {
                    await audio.current.pauseAsync();
                    setIsFollowing(false);
                }
            }
        } catch (error) {}
    }

    const onPlaybackStatusUpdate = async (playbackStatus) => {
        let adjustMillis = playbackStatus['positionMillis'] * (59.5 / 60)
        if (Math.abs((adjustMillis % 1000) - 920) <= 10) { 
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }

    // Called when user makes contact with circle
    const startBreathing = () => {
        if (!hasStarted) {
            setHasStarted(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
        playAudio();
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
        translation.stopAnimation(({ x, y }) => {
            const prevState = (((currentBreathState - 1) % 3) + 3) % 3;
            const ydiff = y - path[2*currentBreathState][1];
            const xdiff = x - path[2*currentBreathState + 1][1];
            setCurrentBreathLength(breathingLength[currentBreathState] * 
            Math.abs(pythagorean(xdiff, ydiff)) / Math.abs(pythagorean(path[2*currentBreathState][1] - path[2*prevState][1], path[2*currentBreathState + 1][1] - path[2*prevState+1][1])));
        });
        pauseAudio();
    }

    useEffect(() => {
        loadSound();
    }, []);

    useEffect(() => {
        if (score == 5) {
            stopBreathing();
            audio.current.unloadAsync();
            endSession(score);
        }
    }, [score]);

    useEffect(() => {
        if(isFollowing) {
            setTimestamp(Date.now());
            Animated.parallel([
                Animated.timing(path[(2 * currentBreathState)][0], {
                    toValue: path[(2 * currentBreathState)][1],
                    useNativeDriver: false,
                    duration: currentBreathLength,
                    easing: Easing.linear
                }),
                Animated.timing(path[(2 * currentBreathState) + 1][0], {
                    toValue: path[(2 * currentBreathState) + 1][1],
                    useNativeDriver: false,
                    duration: currentBreathLength,
                    easing: Easing.linear
                })
            ]).start(({finished}) => {
                if (finished) {
                    setCurrentBreathLength(breathingLength[(currentBreathState + 1) % 3]);
                    if (currentBreathState == 2) {
                        setScore(score + 1);
                    }
                    setCurrentBreathState((currentBreathState + 1) % 3);
                }
            });
        }
    }, [isFollowing, currentBreathState]);
    
    return (
        <Animated.View style = {{opacity:translation.y.interpolate({
            inputRange: [-height, height],
            outputRange: [0.7, 1] })}}>
            <ImageBackground source={backgroundURI} style={{alignItems: "center", width:"100%", height:"100%"}}>
                <View style={[styles.row, {height: verticalScale((1/25) * baseHeight)}]}></View>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
                        <TouchableOpacity onPress={() => { endSession(score); } }>
                            <AntDesign name="close" size={24} color="#777777" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.command}>
                    <Animated.Text style = {[styles.text, {fontSize:translation.y.interpolate({
                        inputRange: [-height, height],
                        outputRange: [scale(40), scale(30)],
                    })}]}>{breathingPath[currentBreathState]}</Animated.Text>
                </View>
            
                <View style = {styles.container}>
                    <View style = {[styles.triangleLine, 
                    {   height: (100 * pythagorean(width, height*1.5) / (2 * height)) + "%",
                        transform: [
                            {translateY: (pythagorean(width, height*1.5) / 2) },
                            {rotate: "-" + (Math.asin(width / pythagorean(width, height*1.55))) + "rad"},
                            {translateY: -(pythagorean(width, height*1.65) / 2) },
                            {translateX: 0.02 * width}
                        ]
                    }]}></View>
                    <View style = {[styles.triangleLine,
                    {   height: (100 * pythagorean(width, height*1.5) / (2 * height)) + "%",
                        transform: [
                            {translateY: (pythagorean(width, height*1.5) / 2) },
                            {rotate: (Math.asin(width / pythagorean(width, height*1.55))) + "rad"},
                            {translateY: -(pythagorean(width, height*1.65) / 2) },
                            {translateX: -0.02 * width}
                        ]
                    }]}></View>
                    <View style = {styles.horizontalLine}></View>
                    <Animated.View style = {[styles.button, {transform: [{translateX:translation.x}, {translateY:translation.y}]}]}>
                        <View 
                        style = {[styles.touch, { backgroundColor: (isFollowing ? "#E5E5E5" : 'black') }
                        ]}
                        onStartShouldSetResponder={() => true}
                        onResponderStart={() => {
                            startBreathing();
                        }}
                        onResponderMove={(event) => {
                            if (event.nativeEvent.touches.length < 2) {
                                const radialDist = pythagorean(event.nativeEvent.locationX - 60, event.nativeEvent.locationY - 60);
                                if (radialDist > 60 && isFollowing) {
                                    stopBreathing();
                                }
                            }
                        }}
                        onResponderRelease={() => {
                            stopBreathing();
                        }}>
                        </View>
                    </Animated.View>
                </View>

                <View style={[styles.row, {justifyContent: 'center', alignItems: "flex-end", height: verticalScale((1/10) * baseHeight)}]}>
                    <View style={[styles.partition, {width: "40%"}]}>
                        {getScoreView().map((color, index) =>
                            <View style={[styles.dot, {backgroundColor:color}]} key={index}></View>
                        )}  
                    </View>
                </View>
            </ImageBackground>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "62%",
        width: "62%",
        alignItems: "center",
        justifyContent: "center",
        top:scale(-20)
    },
    row: {
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
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    horizontalLine: {
        position: "absolute", 
        height: moderateScale(8),
        width: '100%',
        top:"25%",
        borderRadius: 10,
        backgroundColor: '#777777'
    },
    triangleLine: {
        position: "absolute", 
        height: "80%", 
        width: moderateScale(8),
        top:"25%",
        borderRadius: 40,
        backgroundColor: '#777777'     
    },
    command: {
        width: "50%",
        height: "15%",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    text: {
        justifyContent:"center",
        fontWeight: "bold",
        color: '#777777',
        fontSize: scale(30),
        fontFamily: "PoppinsMedium",
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    touch: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 5
    },
    dot: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: 100,
    }
})


