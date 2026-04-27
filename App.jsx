import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ImageListScreen from './src/screens/ImageListScreen';
import FullImageScreen from './src/screens/FullImageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageList" component={ImageListScreen} />
        <Stack.Screen name="FullImage" component={FullImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
