import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home.js"
import Game from "./screens/Game.js"
import End from "./screens/End.js"
import Settings from "./screens/Settings.js"
import About from "./screens/About.js"
import Demo1 from "./screens/Demo1.js"
import Demo2 from "./screens/Demo2.js"
import Demo3 from "./screens/Demo3.js"

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';
import * as Font from 'expo-font';
// import store from "./redux/app-redux"

import { store, persistor } from './redux/state/store';

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" 
                    screenOptions={{ headerShown: false, cardOverlayEnabled: true}}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Game" component={Game} options={{gestureEnabled: false}}/>
                        <Stack.Screen name="End" component={End} options={{gestureEnabled: false}}/>
                        <Stack.Screen name="Settings" component={Settings} options={{gestureEnabled: false}}/>
                        <Stack.Screen name="About" component={About} options={{gestureEnabled: false}}/>
                        <Stack.Screen name="Demo1" component={Demo1} options={{gestureEnabled: false}}/>
                        <Stack.Screen name="Demo2" component={Demo2} options={{gestureEnabled: false}}/>
                        <Stack.Screen name="Demo3" component={Demo3} options={{gestureEnabled: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
