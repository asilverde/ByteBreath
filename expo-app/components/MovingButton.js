import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Animated, Vibration, Text, Dimensions} from 'react-native';
import styles from './Slider.style.js';

var options = 
{
    "square" :
    {
        "transformations" : [[0, -1], [-1, 0], [0, -1], [-1, 0]]
    },
    "line" :
    {
        "transformations" : [[0, -1], [0, 0], [0, -1], [0, 0]]
    },
    "circle" :
    {
        "transformations" : [[0, -1], [0, 0], [0, -1], [0, 0]]
    }
}
// Single function to handle line, box, and circle breathing
function MovingButton() {
    const height = (Dimensions.get('window').height / 2) * 0.7;
    const width = (Dimensions.get('window').width / 2) * 0.7;
    const translationX = useRef(new Animated.Value(-width)).current;
    const translationY = useRef(new Animated.Value(-height)).current;
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    // Called when user makes contact with circle
    const startBreathing = () => {
        setIsFollowing(true);
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
    }

    useEffect(() => {
        Animated.timing(translationX, {
            toValue: width,
            useNativeDriver: false,
            duration: 3000,
        }).start();
    }, []);

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{commands[command]}</Text>
            <View style = {styles.track}>
                <Animated.View style = {[styles.button, {transform: [{translateX:translationX, translateY:translationY}]}]}>
                    <View 
                    style = {[styles.touch, { backgroundColor: hasStarted ? (isFollowing ? '#eb9e21' : '#d6322f') : 'black' }
                    ]}
                    onStartShouldSetResponder={() => true}
                    onTouchStart={() => {
                    }}
                    onResponderStart={() => {
                        setIsFollowing(true);
                    }}
                    onResponderMove={(event) => {
                        if (!loseFlag && event.nativeEvent.touches.length < 2) {
                            const radialDist = calculateRadialDist(event.nativeEvent.locationX - 75, event.nativeEvent.locationY - 75);
                            if (radialDist > 75) {
                                setIsFollowing(false);
                            } else {
                                setIsFollowing(true);
                            }
                        }
                    }}
                    onResponderRelease={() => {
                        setIsFollowing(false);
                    }}>
                    </View>
                </Animated.View>
            </View>
            <Text style = {styles.text}>{count}</Text>
        </View>
    )
}

export default MovingButton
