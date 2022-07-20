import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, Vibration, Text, Dimensions} from 'react-native';
import styles from './Slider.style.js';
import { Audio } from 'expo-av';

function Slider( {endSession} ) {
    const width = (Dimensions.get('window').width / 2) * 0.7;

    // Game Mechanics
    const commands = ['INHALE', 'PAUSE', 'EXHALE', 'PAUSE'];
    const [command, updateCommand] = useState(0);
    const [count, updateCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const translation = useRef(new Animated.Value(-width)).current;
    
    // Track Finger Movement
    const [isFollowing, setIsFollowing] = useState(false);
    const [timeOfRelease, setTimeOfRelease] = useState(0);
    const [releaseFlag, setReleaseFlag] = useState(false);

    // End Game Transition Flags
    const [loseFlag, setLoseFlag] = useState(false);
    const [endFlag, setEndFlag] = useState(false);

    // Audio Player for Inhale/Exhale Sounds
    const AudioPlayer = useRef(new Audio.Sound());


    // Called when user makes contact with circle
    const startBreathing = () => {
        checkRelease();
        setTimeOfRelease(0);
        Vibration.cancel();
        if (!hasStarted) {
            setHasStarted(true);
        }
        setIsFollowing(true);
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
        if (isFollowing && checkEndSession()) {
            setReleaseFlag(true);
            setIsFollowing(false);
            if (timeOfRelease == 0) {
                setTimeOfRelease(Date.now());
            }
            Vibration.vibrate([0, 1000, 1000, 1000, 1000]);
        }
    }

    // Determines if finger is within circle
    const calculateRadialDist = (x_dist, y_dist) => {
        return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
    }

    // Determines if finger has been lifted for more than 5 seconds
    const checkRelease = () => {
        if (timeOfRelease != 0 && Date.now() - timeOfRelease > 5000) {
            setLoseFlag(true);
        }
    }
    
    // Increments counter if finger has not been lifted during the breath
    const updateBreathCount = () => {
        if (command == 3) {
            if (releaseFlag) {
                setReleaseFlag(false);
            } else {
                updateCount(count + 1);
            } 
        }
    }

    // Calls navigation function from App.js to move screens if game over
    const checkEndSession = () => {
        if (endFlag) return false;
        else if (count == 10 || loseFlag) {
            endSession(count);
            setEndFlag(true);
            return false;
        }
        return true;
    }

    // Functions for Inhale/Exhale sound playback

    async function playInhale() {
        await AudioPlayer.current.unloadAsync();
        await AudioPlayer.current.loadAsync(require('../assets/sounds/inhale.wav'), {}, true);
        await AudioPlayer.current.playAsync();
    }

    async function playExhale() {
        await AudioPlayer.current.unloadAsync();
        await AudioPlayer.current.loadAsync(require('../assets/sounds/exhale.wav'), {}, true);
        await AudioPlayer.current.playAsync();
    }
        

    useEffect(() => {
        if (hasStarted && checkEndSession()) {
            checkRelease();
            if (command % 2 == 1) {
                setTimeout(() => {
                    updateCommand((command + 1) % 4);
                }, 2000);
                updateBreathCount();
            } else {
                (command == 0) ? playInhale() : playExhale();
                const target = (command == 0) ? width : -width;
                Animated.timing(translation, {
                  toValue: target,
                  useNativeDriver: false,
                  duration: 5000,
                }).start(({finished}) => {
                    if (finished) { 
                        updateCommand((command + 1) % 4);
                    }
                });
            }
            checkRelease();
        }
    }, [command, hasStarted, loseFlag]);

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{commands[command]}</Text>
            <View style = {styles.track}>
                <Animated.View style = {[styles.button, {transform: [{translateX:translation}]}]}>
                    <View 
                    style = {[styles.touch, { backgroundColor: hasStarted ? (isFollowing ? '#005e00' : '#8e0000') : 'black' }
                    ]}
                    onStartShouldSetResponder={() => true}
                    onResponderStart={() => {
                        startBreathing();
                    }}
                    onResponderMove={(event) => {
                        if (!loseFlag && event.nativeEvent.touches.length < 2) {
                            const radialDist = calculateRadialDist(event.nativeEvent.locationX - 75, event.nativeEvent.locationY - 75);
                            if (radialDist > 75) {
                                stopBreathing();
                            } else {
                                startBreathing();
                            }
                        }
                    }}
                    onResponderRelease={() => {
                        if (!loseFlag)
                            stopBreathing();
                    }}>
                    </View>
                </Animated.View>
            </View>
            <Text style = {styles.text}>{count}</Text>
        </View>
    );
}

export default Slider;