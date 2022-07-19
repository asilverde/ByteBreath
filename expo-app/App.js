import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Slider from "./components/Slider.jsx"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Intructions</Text>
      <Button
        title="Begin 10 Breaths"
        onPress={() => navigation.navigate('Meditate')}
      />
    </View>
  );
}

function MeditateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Slider
        endSession={(breathCount) => navigation.navigate('End', {breathCount})}
      />
    </View>
  );
}

function EndScreen({ route, navigation }) {
  const {breathCount} = route.params;
  let endText = `You only completed ${breathCount} breath(s).`;
  if (breathCount == 10) {
    endText = "Congratulations! You have completed 10 breaths."
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{endText}</Text>
      <Button
        title="Restart"
        onPress={() => navigation.navigate('Home')}
      />
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
        <Stack.Screen name="Meditate" component={MeditateScreen} />
        <Stack.Screen name="End" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});
