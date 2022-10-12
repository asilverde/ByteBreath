import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Animated, Easing, Vibration, Text, Dimensions} from 'react-native';
import styles from './Slider.style.js';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// Single function to handle line and box
function MovingButton() {
    const height = (Dimensions.get('window').height / 2) * 0.6;
    const width = (Dimensions.get('window').width / 2) * 0.6;
    const translation = useRef(new Animated.ValueXY({x:-width, y:height})).current;
    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState([]);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );
    const [timeOfRelease, setTimeOfRelease] = useState(0);

    const breathingPath = ["Inhale", "Pause", "Exhale", "Pause"];
    const [currentBreath, setCurrentBreath] = useState(0);

    const [currentSound, setCurrentSound] = useState(14 - settings.inhale);
    const [soundsLoaded, setSoundsLoaded] = useState(false);

    const harpSound = useRef(new Audio.Sound());

    const ambientSound = useRef(new Audio.Sound());
    const breathingSound = useRef(new Audio.Sound());

    async function loadSounds() {
        await harpSound.current.unloadAsync();
        await harpSound.current.loadAsync(require('../assets/BB-sounds/BB-main-525.wav'), {}, true);
    }
    async function playInhale() {
        await breathingSound.current.unloadAsync();
        await breathingSound.current.loadAsync(require('../assets/BB-sounds/Inhale.wav'), {}, true);
        await breathingSound.current.playAsync();
    }

    async function playExhale() {
        await breathingSound.current.unloadAsync();
        await breathingSound.current.loadAsync(require('../assets/BB-sounds/Exhale.wav'), {}, true);
        await breathingSound.current.playAsync();
    }

    async function playHarp() {
        await harpSound.current.playAsync();
    }

    const playAudio = async () => {
        try {
          const result = await harpSound.current.getStatusAsync();
          if (result.isLoaded) {
            if (result.isPlaying === false) {
                harpSound.current.playAsync();
            }
          }
        } catch (error) {}
      };
    
      const pauseAudio = async () => {
        try {
          const result = await harpSound.current.getStatusAsync();
          if (result.isLoaded) {
            if (result.isPlaying === true) {
                setTimeout(() => harpSound.current.pauseAsync(), 1000);
            }
          }
        } catch (error) {}
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
        }
        playAudio();
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
        if (isFollowing) {
            setIsFollowing(false);
            if (timeOfRelease == 0) {
                setTimeOfRelease(Date.now());
            }
        }
        pauseAudio();
    }


    var options = 
    {
        "box" :
        {
            "transformations" : [[translation.y, -height], [translation.x, width], [translation.y, height], [translation.x, -width]]
        },
        "line" :
        {
            "transformations" : [[translation.y, -height], [translation.x, 0], [translation.y, height], [translation.x, 0]]
        },
        "circle" :
        {
            "transformations" : [[0, -1], [0, 0], [0, -1], [0, 0]]
        }
    }
    let current_path = [];
    if (settings.mode == "box") {
        current_path = options["box"]["transformations"];
    } else {
        current_path = options["line"]["transformations"];
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
        setCurrentBreath(0);
        setPath(output);
    }

    useEffect(() => {
        if (!soundsLoaded) {
            loadSounds();
            setSoundsLoaded(true);
        }
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
                        setCurrentBreath((currentBreath + 1) % 4);
                    } else {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    setPath(path.slice(1));
                });
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                buildPath();
            }
        }
    }, [isFollowing, path]);

    return (
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
