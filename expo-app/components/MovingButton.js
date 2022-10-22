import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Animated, Easing, Vibration, Text, Dimensions} from 'react-native';
import styles from './Slider.style.js';

import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// Single function to handle line and box
function MovingButton ( {endSession} ) {
    const height = (Dimensions.get('window').height / 2) * 0.6;
    const width = (Dimensions.get('window').width / 2) * 0.6;
    const translation = useRef(new Animated.ValueXY({x:-width, y:height})).current;
    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState([[translation.y, -height], [translation.x, width], [translation.y, height], [translation.x, -width]]);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );
    const [hasStarted, setHasStarted] = useState(0);
    const [score, setScore] = useState(-1);

    const breathingLength = [settings.inhale * 1000, settings.pause * 1000, 
                             settings.exhale * 1000, settings.pause * 1000];
    const breathingPath = ["Inhale", "Pause", "Exhale", "Pause"];
    const [currentBreathState, setCurrentBreathState] = useState(0);
    const [currentBreathLength, setCurrentBreathLength] = useState(breathingLength[0]);

    const audio = useRef(new Audio.Sound());
    
    // if (settings.mode == "box") {
    //     setPath([[translation.y, -height], [translation.x, width], [translation.y, height], [translation.x, -width]])
    // } else {
    //     setPath([[translation.y, -height], [translation.x, 0], [translation.y, height], [translation.x, 0]])
    // }

    // Determines if finger is within circle
    const calculateRadialDist = (x_dist, y_dist) => {
        return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
    }

    async function loadSound() {
        await audio.current.unloadAsync();
        audio.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await audio.current.loadAsync( require('../assets/sounds/BB525.wav'), 
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

    const playHaptic = (positionMillis) => {
        let adjustMillis = positionMillis * (59.5 / 60)
        // let offset = 20;
        // let totalLength = settings.inhale + 2 * settings.pause + settings.exhale;
        // console.log(Math.abs((positionMillis % 1000) - 100));
        if (Math.abs((adjustMillis % 1000) - 920) <= 10) { 
            // let secondsPast = Math.round((positionMillis / 1000));
            // if (secondsPast % totalLength == 0 ||
            //     secondsPast % totalLength == settings.inhale ||
            //     secondsPast % totalLength == settings.inhale + settings.pause ||
            //     secondsPast % totalLength == settings.inhale + settings.pause + settings.exhale) {
            //     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            // } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // }
        }
    };

    const onPlaybackStatusUpdate = async (playbackStatus) => {
        playHaptic(playbackStatus['positionMillis']);
    }

    // Called when user makes contact with circle
    const startBreathing = () => {
        if (!hasStarted) {
            setHasStarted(true);
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
        if(isFollowing) {
            Animated.timing(path[currentBreathState][0], {
                toValue: path[currentBreathState][1],
                useNativeDriver: false,
                duration: currentBreathLength,
                easing: Easing.linear
            }).start(({finished}) => {
                if (finished) {
                    setCurrentBreathLength(breathingLength[(currentBreathState + 1) % 4]);
                    setCurrentBreathState((currentBreathState + 1) % 4);
                }
            });
        }
    }, [isFollowing, currentBreathState]);

    return (
        <View style = {styles.container}>
            <View style = {styles.command} ><Text style = {styles.text}>{breathingPath[currentBreathState]}</Text></View>
            <View style = {styles.score} ><Text style = {styles.text}>{(score >= 0 ) ? score : 0}</Text></View>
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
                        const radialDist = calculateRadialDist(event.nativeEvent.locationX - 60, event.nativeEvent.locationY - 60);
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
    )
}

export default MovingButton
