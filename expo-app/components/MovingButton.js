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
    const translation = useRef(new Animated.ValueXY({x:-width, y:height})).current;
    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState([]);
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );
    const square_path = [-height, width, height, -width]

    // Called when user makes contact with circle
    const startBreathing = () => {
        setIsFollowing(true);
    }

    // Called when user releases contact with circle
    const stopBreathing = () => {
        translation.stopAnimation(({ value }) =>
            console.log("Final Value: " + value)
        )
    }

    useEffect(() => {
        if(isFollowing) {
            if (path.length != 0) {
                if (path.length % 2 == 0) {
                    Animated.timing(translation.y, {
                        toValue: path[0],
                        useNativeDriver: false,
                        duration: 3000,
                    }).start(() => {setPath(path.slice(1))});
                } else {
                    Animated.timing(translation.x, {
                        toValue: path[0],
                        useNativeDriver: false,
                        duration: 3000,
                    }).start(() => {setPath(path.slice(1))});
                }
            } else {
                setPath(square_path);
            }
        }
    }, [isFollowing, path]);

    return (
        <View style = {styles.container}>
            <View>
                <Animated.View style = {[styles.button, {transform: [{translateX:translation.x}, {translateY:translation.y}]}]}>
                    <View 
                    style = {[styles.touch, { backgroundColor: (isFollowing ? '#eb9e21' : '#d6322f') }
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
        </View>
    )
}

export default MovingButton
