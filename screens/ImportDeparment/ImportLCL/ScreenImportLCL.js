import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeImportLCL from './HomeImportLCL';
import DetailImportLCL from './DetailImportLCL';
import AddImportLCL from './AddImportLCL';
import UpdateImportLCL from './UpdateImportLCL';

const Stack = createStackNavigator();

const ScreenImportLCL = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeImportLCL" component={HomeImportLCL} />
      <Stack.Screen name="DetailImportLCL" component={DetailImportLCL} />
      <Stack.Screen name="AddImportLCL" component={AddImportLCL} />
      <Stack.Screen name="UpdateImportLCL" component={UpdateImportLCL} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default ScreenImportLCL