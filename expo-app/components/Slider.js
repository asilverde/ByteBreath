import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Animated, Vibration, Text} from 'react-native';
import styles from './Slider.style.js';

export default function Slider( {endSession} ) {
    const commands = ['INHALE', 'PAUSE', 'EXHALE', 'PAUSE'];
    const [command, updateCommand] = useState(0);
    const [count, updateCount] = useState(0);
    
    const [isFollowing, setIsFollowing] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const translation = useRef(new Animated.Value(-225)).current

    const [timeOfRelease, setTimeOfRelease] = useState(0);
    const [loseFlag, setLoseFlag] = useState(false);
    const [releaseFlag, setReleaseFlag] = useState(false);

    const calculateRadialDist = (x_dist, y_dist) => {
        return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
    }

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
            setHasStarted(true);
        }
        setIsFollowing(true);
    }

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

    const updateBreathCount = () => {
        if (command == 3) {
            if (releaseFlag) {
                setReleaseFlag(false);
            } else {
                updateCount(count + 1);
            } 
        }
    }

    const checkEndSession = () => {
        if (count == 10 || loseFlag) {
            endSession(count);
            return false;
        }
        return true;
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
                const target = (command == 0) ? 225 : -225;
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
                  style = {[styles.touch, {backgroundColor: isFollowing ? 'green' : 'red'}]}
                  onStartShouldSetResponder={() => true}
                  onResponderStart={() => {
                      startBreathing();
                  }}
                  onResponderMove={(event) => {
                      const radialDist = calculateRadialDist(event.nativeEvent.locationX - 75, event.nativeEvent.locationY - 75);
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
          </View>
          <Text style = {styles.text}>{count}</Text>
      </View>
    );
}