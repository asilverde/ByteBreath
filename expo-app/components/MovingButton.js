import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View } from 'react-native';


// Single function to handle line, box, and circle breathing
function MovingButton(props) {
    const dispatch = useDispatch();
    const settings = useSelector( state => state.settings );

    // useEffect(() => {
    //     for (let a = 0; a < props.animations.length() - 1; a++) {
    //         Animated.timing(props.animations[a], {
    //             toValue: props.animations[a],
    //             useNativeDriver: false,
    //             duration: props.time[a],
    //         }).start();
    //     }
    // }, []);

    return (
        <View>
            <Text>{settings.inhale}</Text>
            <Text>{settings.exhale}</Text>
            <Text>{settings.pause}</Text>
            <Text>{settings.mode}</Text>
            <Text>{settings.background}</Text>
        </View>
    )
}

export default MovingButton
