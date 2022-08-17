import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 

import Slider from "./components/Slider.js"
import { Audio } from 'expo-av';

// import { Provider } from 'react-redux'
// import store from "./redux/app-redux"

function HomeScreen({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('./assets/sounds/short-bell.wav'), {}, true);
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>5 BREATHS</Text>
            <Text style={styles.text}>A simple, tactile approach to meditation. Track the yellow orb with your finger and synchronize your breath to movement.</Text>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                AudioPlayer.current.playFromPositionAsync(0);
                navigation.navigate('Meditate');
              }
            }>
                <AntDesign name="arrowright" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

function MeditateScreen({ navigation }) {
    const AudioPlayer = useRef(new Audio.Sound());
    AudioPlayer.current.loadAsync(require('./assets/sounds/long-bell.wav'), {}, true);

    return (
        <View>
            <Slider
            endSession={(breathCount) => {
              AudioPlayer.current.playFromPositionAsync(0);
              navigation.navigate('End', {breathCount});
            }}/>
        </View>
    );
}

function EndScreen({ route, navigation }) {
    const {breathCount} = route.params;
    const endText = `Completed Breaths: ${breathCount}`;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{(breathCount == 5) ? 'Good Job' : ''}</Text>
            <Text style={styles.text}>{endText}</Text>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
                <Fontisto name="redo" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" 
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Meditate" component={MeditateScreen} options={{gestureEnabled: false}}/>
                <Stack.Screen name="End" component={EndScreen} options={{gestureEnabled: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        flexDirection:"column",
        justifyContent:'space-around',
        padding: 40
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    text: {
        fontSize: 20,
        width: "60%",
        textAlign: "center",
        color: "white"
    },
    button: {
        width:100,
        height:50,
        alignItems: "center",
        backgroundColor: "#eb9e21",
        borderRadius: 25,
        padding: 10
    }
});
