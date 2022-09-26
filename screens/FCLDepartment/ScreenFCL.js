
import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Detail from "./Detail";
import Add from './AddFCL';
import Update from './UpdateFCL';

const Stack = createStackNavigator();

export default function fcl () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="Add" component={Add}/>
        <Stack.Screen name="Update" component={Update}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}