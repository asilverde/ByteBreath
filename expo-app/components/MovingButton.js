import React, {useState, useEffect, useRef} from 'react';

// Single function to handle line, box, and circle breathing
function MovingButton(props) {
    useEffect(() => {
        for (let a = 0; a < props.animations.length() - 1; a++) {
            Animated.timing(props.animations[a], {
                toValue: props.animations[a],
                useNativeDriver: false,
                duration: props.time[a],
            }).start();
        }
    }, []);

    return (
        <div>
        </div>
    )
}

export default MovingButton
