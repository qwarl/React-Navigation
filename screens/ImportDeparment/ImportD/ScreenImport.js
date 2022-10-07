import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeImport from './HomeImport';
import DetailImport from './DetailImport';
import AddImport from './AddImport';
import UpdateImport from './UpdateImport';

const Stack = createStackNavigator();

const ScreenImport = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeImport" component={HomeImport} />
      <Stack.Screen name="DetailImport" component={DetailImport} />
      <Stack.Screen name="AddImport" component={AddImport} />
      <Stack.Screen name="UpdateImport" component={UpdateImport} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default ScreenImport