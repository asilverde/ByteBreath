import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ImageBackground, View, Animated, Easing, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import {scale, verticalScale, moderateScale, baseWidth, baseHeight} from "../utils/Scaling.js"


export default function Game({ navigation }) {
    // const AudioPlayer = useRef(new Audio.Sound());
    // AudioPlayer.current.loadAsync(require('../assets/sounds/Complete.wav'), {}, true);

    const height = (Dimensions.get('window').height / 2) * 0.6;
    const width = (Dimensions.get('window').width / 2) * 0.6;
    const translation = useRef(new Animated.ValueXY({x:-width, y:height})).current;

    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    const attributes = {
        "box": {
            "breath": require('../assets/sounds/box-breath.wav'),
            "om": require('../assets/sounds/box-om.wav'),
            "wave": require('../assets/sounds/box-wave.wav'),
            "path": [[translation.y, -height], [translation.x, width], [translation.y, height], [translation.x, -width]],
            "breathingLength": [settings.inhale * 1000, settings.pause * 1000, 
                                settings.exhale * 1000, settings.pause * 1000],
            "breathingPath": ["Inhale", "Pause", "Exhale", "Pause"],
        },
        "line": {
            "breath": require('../assets/sounds/line-breath.wav'),
            "om": require('../assets/sounds/line-om.wav'),
            "wave": require('../assets/sounds/line-wave.wav'),
            "path": [[translation.y, -height], [translation.y, height]],
            "breathingLength": [settings.inhale * 1000, settings.exhale * 1000],
            "breathingPath": ["Inhale", "Exhale"]
        },
        "triangle": {
            "breath": require('../assets/sounds/tri-breath.wav'),
            "om": require('../assets/sounds/tri-om.wav'),
            "wave": require('../assets/sounds/tri-wave.wav'),
            "path": [[translation.y, -height / 2], [translation.x, -width], [translation.y, -height / 2], [translation.x, width], [translation.y, height], [translation.x, 0]],
            "breathingLength": [settings.inhale * 1000, 
                                settings.exhale * 1000, settings.pause * 1000],
            "breathingPath": ["Inhale", "Pause", "Exhale", "Pause"]
        }
    }

    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState(attributes[settings.style]["path"]);
    const [hasStarted, setHasStarted] = useState(0);
    const [score, setScore] = useState(0);

    const breathingLength = attributes[settings.style]["breathingLength"];
    const breathingPath = attributes[settings.style]["breathingPath"]
    const [currentBreathState, setCurrentBreathState] = useState(0);
    const [currentBreathLength, setCurrentBreathLength] = useState(breathingLength[0]);

    const audio = useRef(new Audio.Sound());
    const backgroundURI = (settings.scene == 'space') ? require('../assets/backgrounds/space.jpg') : ((settings.scene == 'nature') ? require('../assets/backgrounds/nature.jpg') : require('../assets/backgrounds/cloud.jpg'));

    const pythagorean = (x_dist, y_dist) => {
        return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));
    }

    const getScoreView = () => {
        let colors = ["black", "black", "black", "black", "black"];
        for (var i = 0; i < score; i++) {
            colors[i] = "#777777";
        }
        return colors;
    }


    const endSession = (breathCount) => {
        if (breathCount == 5) {
            AudioPlayer.current.playFromPositionAsync(0);
            navigation.navigate('End', {breathCount});
        } else {
            navigation.navigate('Home');
        }
    }

    async function loadSound() {
        await audio.current.unloadAsync();
        audio.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await audio.current.loadAsync( attributes[settings.style][settings.sound], 
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
            setCurrentBreathLength((breathingLength[currentBreathState]) * 
            (1 - Math.abs(((currentBreathState % 2 == 0) ? y : x) + path[currentBreathState][1]) / 
            (2 * Math.abs(path[currentBreathState][1]))));
        });
        pauseAudio();
    }

    useEffect(() => {
        loadSound();
    }, []);

    useEffect(() => {
        if (score == 5) {
            stopBreathing();
            setIsFollowing(false);
            audio.current.unloadAsync();
            endSession(score);
        }
    }, [score]);

    useEffect(() => {
        if(isFollowing) {
            Animated.timing(path[currentBreathState][0], {
                toValue: path[currentBreathState][1],
                useNativeDriver: false,
                duration: currentBreathLength,
                easing: Easing.linear
            }).start(({finished}) => {
                if (finished) {
                    setCurrentBreathLength(breathingLength[(currentBreathState + 1) % breathingLength.length]);
                    if (currentBreathState == (breathingLength.length - 1)) {
                        setScore(score + 1);
                    }
                    setCurrentBreathState((currentBreathState + 1) % breathingLength.length);
                }
            });
        }
    }, [isFollowing, currentBreathState]);

    return (
        <Animated.View style = {{opacity:translation.y.interpolate({
            inputRange: [-height, height],
            outputRange: [0.7, 1],
          })}}>
            <ImageBackground source={backgroundURI}  style={{alignItems: "center", width: '100%', height: '100%'}}>
                <View style={styles.row}></View>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <View style={[styles.partition, {width: '10%', justifyContent: 'center'}]}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); } }>
                            <AntDesign name="close" size={24} color="#777777" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.command}>
                    <Animated.Text style = {[styles.text, {fontSize:translation.y.interpolate({
                        inputRange: [-height, height],
                        outputRange: [scale(50), scale(35)],
                    })}]}>{breathingPath[currentBreathState]}</Animated.Text>
                </View>
                    
                <View style = {styles.container}>
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
        borderWidth: scale(5),
        borderColor: "#777777"
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
    },
})

