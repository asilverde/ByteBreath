import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Animated, Vibration, Text} from 'react-native';

export default function Slider( {endSession} ) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isInhaling, setIsInhaling] = useState(false);
  const translation = useRef(new Animated.Value(-225)).current
  
  const [timeOfRelease, setTimeOfRelease] = useState(0);
  const [loseFlag, setLoseFlag] = useState(false);
  const [releaseFlag, setReleaseFlag] = useState(true);
  const [count, updateCount] = useState(0);

  const calcRadialDist = (x_dist, y_dist) => {
    return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
  }
  
  // TRUE if button left longer 5s untouched.
  const checkRelease = () => {
    if (timeOfRelease != 0 && Date.now() - timeOfRelease > 5000) {
      setLoseFlag(true);
    }
  }

  const startBreathing = () => {
    checkRelease();
    setTimeOfRelease(0);
    Vibration.cancel();
    if (!hasStarted) {
      setIsInhaling(true);
      setHasStarted(true);
    }
    setIsFollowing(true);
  }

  const stopBreathing = () => {
    if (isFollowing) {
      setReleaseFlag(true);
      setIsFollowing(false);
      if (timeOfRelease == 0) {
        setTimeOfRelease(Date.now());
      }
      Vibration.vibrate([0, 1000, 1000, 1000, 1000]);
    }
  }

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 20,
    },
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
    checkRelease();
    if (loseFlag) {
      endSession(count);
    } else if (count == 9 && isInhaling) {
      endSession(count+1);
      Vibration.cancel();
    } else {
      if (releaseFlag && isInhaling) {
        setReleaseFlag(false);
      } else if (hasStarted && isInhaling) {
        updateCount(count+1);
      }
      const target = (isInhaling * 450 - 225);
      Animated.timing(translation, {
          toValue: target,
          useNativeDriver: false,
          duration: 5000,
      }).start(({finished}) => {
          if (finished && hasStarted) {
            setTimeout(() => {
              setIsInhaling(!isInhaling);
            }, 2000);
          }
      });
    }
  }, [isInhaling, hasStarted, loseFlag]);

  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>{(!hasStarted || isInhaling) ? "INHALE" : "EXHALE"}</Text>
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
      <Text style = {styles.text}>{count}</Text>
    </View>
  );
}