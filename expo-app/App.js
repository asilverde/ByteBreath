import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home.js"
import Game from "./screens/Game.js"
import End from "./screens/End.js"

// import { Provider } from 'react-redux'
// import store from "./redux/app-redux"

function App() {
    const Stack = createNativeStackNavigator();
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" 
                screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Game" component={Game} options={{gestureEnabled: false}}/>
                    <Stack.Screen name="End" component={End} options={{gestureEnabled: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}

export default App;