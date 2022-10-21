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
    const [path, setPath] = useState([]);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );
    const [timeOfRelease, setTimeOfRelease] = useState(0);
    const [hasStarted, setHasStarted] = useState(0);
    const [score, setScore] = useState(-1);

    const breathingPath = ["Inhale", "Pause", "Exhale", "Pause"];
    const [currentBreathState, setCurrentBreathState] = useState(0);

    const inhale = useRef(new Audio.Sound());
    const exhale = useRef(new Audio.Sound());

    async function loadInhale() {
        await inhale.current.unloadAsync();
        await inhale.current.loadAsync(require('../assets/BB-sounds/Inhale525.wav'), {}, true);
    }

    async function loadExhale() {
        await exhale.current.unloadAsync();
        await exhale.current.loadAsync(require('../assets/BB-sounds/Exhale525.wav'), {}, true);
    }

    async function playInhale() {
        await inhale.current.playAsync();
    }

    async function playExhale() {
        await exhale.current.playAsync();
    }

    async function resetInhale() {
        await inhale.current.setPositionAsync(0);
    }

    async function resetExhale() {
        await exhale.current.setPositionAsync(0);
    }

    const playAudio = async () => {
        if (currentBreathState < 2) {
            try {
                const result = await inhale.current.getStatusAsync();
                if (result.isLoaded) {
                    if (result.isPlaying === false) {
                        inhale.current.playAsync();
                    }
                }
            } catch (error) {}
        } else {
            try {
                const result = await exhale.current.getStatusAsync();
                if (result.isLoaded) {
                    if (result.isPlaying === false) {
                        exhale.current.playAsync();
                    }
                }
            } catch (error) {}
        }
      };
    
      const pauseAudio = async () => {
        if (currentBreathState < 2) {
            try {
            const result = await inhale.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === true) {
                    inhale.current.pauseAsync();
                }
            }
            } catch (error) {}
        } else {
            try {
                const result = await exhale.current.getStatusAsync();
                if (result.isLoaded) {
                  if (result.isPlaying === true) {
                      exhale.current.pauseAsync();
                  }
                }
            } catch (error) {}
        }
      };
    

    // Determines if finger is within circle
    const calculateRadialDist = (x_dist, y_dist) => {
        return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
    }

    // Called when user makes contact with circle
    const startBreathing = () => {
        if (timeOfRelease == 0 || Date.now() - timeOfRelease > 1000){
            setTimeOfRelease(0);
            setIsFollowing(true);
            playAudio();
        }
        if (!hasStarted) {
            setHasStarted(true);
        }
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
        if (isFollowing) {
            setIsFollowing(false);
            if (timeOfRelease == 0) {
                setTimeOfRelease(Date.now());
            }
            pauseAudio();
        }
    }

    let current_path = [];
    if (settings.mode == "box") {
        current_path = [[translation.y, -height], [translation.x, width], [translation.y, height], [translation.x, -width]]
    } else {
        current_path = [[translation.y, -height], [translation.x, 0], [translation.y, height], [translation.x, 0]]
        translation.x.setValue(0);
    }

    const buildPath = () => {
        output = []
        for (let i = 0; i < settings.inhale; i++) {
            output.push([current_path[0][0], (2 * (i + 1) * current_path[0][1] / settings.inhale) - current_path[0][1]]);
        }
        for (let i = 0; i < settings.pause; i++) {
            if (current_path[1][1] == 0) {
                output.push([current_path[1][0], 0]);
            } else {
                output.push([current_path[1][0], (2 * (i + 1) * current_path[1][1] / settings.pause) - current_path[1][1]]);
            }
        }
        for (let i = 0; i < settings.exhale; i++) {
            output.push([current_path[2][0], (2 * (i + 1) * current_path[2][1] / settings.exhale) - current_path[2][1]]);
        }
        for (let i = 0; i < settings.pause; i++) {
            if (current_path[3][1] == 0) {
                output.push([current_path[3][0], 0]);
            } else {
                output.push([current_path[3][0], (2 * (i + 1) * current_path[3][1] / settings.pause) - current_path[3][1]]); 
            }
        }
        setCurrentBreathState(0);
        setPath(output);
    }

    useEffect(() => {
        if(isFollowing) {
            if (path.length != 0) {
                Animated.timing(path[0][0], {
                    toValue: path[0][1],
                    useNativeDriver: false,
                    duration: 1000,
                    easing: Easing.linear
                }).start(() => {
                    if (path.length - 1 == settings.inhale + 2 * settings.pause + settings.exhale ||
                        path.length - 1 == 2 * settings.pause + settings.exhale ||
                        path.length - 1 == settings.pause + settings.exhale ||
                        path.length - 1 == settings.pause) {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        setCurrentBreathState((currentBreathState + 1) % 4);
                    } else {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    console.log(currentBreathState);
                    setPath(path.slice(1));
                });
            } else {
                setScore(score + 1);
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                buildPath();
            }
        }
    }, [isFollowing, path]);

    useEffect(() => {
        if (score < 5) {
            if (hasStarted) {
                if (currentBreathState == 0) {
                    playInhale();
                } else if (currentBreathState == 1) {
                    resetExhale();
                } else if (currentBreathState == 2) {
                    playExhale();
                } else {
                    resetInhale();
                }
                
            } else {
                loadInhale();
                loadExhale();
            }
        } else {
            endSession();
        }
    }, [currentBreathState, hasStarted])

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
