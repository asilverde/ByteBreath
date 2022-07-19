import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from "./components/Slider.jsx"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>10 BREATHS</Text>
      <Text style={styles.text}>A simple, tactile approach to meditation. Track the green orb with your finger and synchronize your breath to movement.</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Meditate')}>
          <Text style={{fontSize: 24, padding:10}}>Begin</Text>
      </TouchableOpacity>
    </View>
  );
}

function MeditateScreen({ navigation }) {
  return (
    <View>
      <Slider
        endSession={(breathCount) => navigation.navigate('End', {breathCount})}
      />
    </View>
  );
}

function EndScreen({ route, navigation }) {
  const {breathCount} = route.params;
  let endText = `Completed Breaths: ${breathCount}`;
  if (breathCount == 10) {
    endText = "Congratulations! You completed 10 breaths."
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{endText}</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize: 24, padding:10}}>Restart</Text>
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
    flexDirection:"column",
    justifyContent:'space-around',
    padding: 40
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    fontSize: 20,
    width: "60%",
    textAlign: "center"
  },
  button: {
    width:100,
    height:50,
    alignItems: "center",
    backgroundColor: "#b3effc",
    borderRadius: 25
  }
});
