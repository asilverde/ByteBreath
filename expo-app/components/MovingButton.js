import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Animated, Easing, Vibration, Text, Dimensions} from 'react-native';
import styles from './Slider.style.js';
import * as Haptics from 'expo-haptics';

// Single function to handle line, box, and circle breathing
function MovingButton() {
    const height = (Dimensions.get('window').height / 2) * 0.6;
    const width = (Dimensions.get('window').width / 2) * 0.6;
    const translation = useRef(new Animated.ValueXY({x:-width, y:height})).current;
    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState([]);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

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

    // Called when user makes contact with circle
    const startBreathing = () => {
        setIsFollowing(true);
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
        console.log(output);
        setPath(output);
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
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
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    } else {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    setPath(path.slice(1));
                });
            } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
                onTouchStart={() => {
                    setIsFollowing(true);
                }}
                onResponderStart={() => {
                    setIsFollowing(true);
                }}
                onResponderMove={(event) => {
                }}
                onResponderRelease={() => {
                    setIsFollowing(false);
                }}>
                </View>
            </Animated.View>
        </View>
    )
}

export default MovingButton
