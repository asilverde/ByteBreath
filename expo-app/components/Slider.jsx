import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Animated} from 'react-native';

export default function Slider() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isInhaling, setIsInhaling] = useState(false);
  const translation = useRef(new Animated.Value(-225)).current

  const calcRadialDist = (x_dist, y_dist) => {
    return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
  }
  const startBreathing = () => {
    if (!hasStarted) {
      setIsInhaling(true);
      setHasStarted(true);
    }
    setIsFollowing(true);
  }

  const stopBreathing = () => {
    setIsFollowing(false);
  }

  const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: isFollowing ? 'green' : 'red',
      transform: [{translateX:translation}]
    },
    touch: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: isFollowing ? 'green' : 'red'
    },
  });

  useEffect(() => {
    const target = (isInhaling * 450 - 225);
    Animated.timing(translation, {
        toValue: target,
        useNativeDriver: false,
        duration: 5000,
    }).start(({finished}) => {
        if (hasStarted) {
          setTimeout(() => {
            if (finished) {
              setIsInhaling(!isInhaling);
            }
          }, 2000);
        }
    })
  }, [isInhaling, hasStarted]);

  return (
    <React.Fragment>
      <Animated.View style = {styles.button}>
        <View
        style = {styles.touch}
        onStartShouldSetResponder={() => true}
        onResponderStart={() => {
          startBreathing();
        }}
        onResponderMove={(event) => {
          const radialDist = calcRadialDist(event.nativeEvent.locationX - 75, event.nativeEvent.locationY - 75);
          if (radialDist > 75) {
              stopBreathing();
          } else {
              startBreathing();
          }
        }}
        onResponderRelease={() => {
            stopBreathing();
        }}>
        </View>
      </Animated.View>
    </React.Fragment>
  );
}