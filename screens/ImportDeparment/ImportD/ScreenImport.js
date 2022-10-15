import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeImport from './HomeImport';
import DetailImport from './DetailImport';
import AddImport from './AddImport';
import UpdateImport from './UpdateImport';
import HomeTabImport from './HomeTabImport';

const Stack = createStackNavigator();

const ScreenImport = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeTabImport" component={HomeTabImport} options={{ headerShown: false }} />
      <Stack.Screen name="DetailImport" component={DetailImport} options={{ headerShown: false }} />
      <Stack.Screen name="AddImport" component={AddImport} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateImport" component={UpdateImport} options={{ headerShown: false }} />
    </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default ScreenImport