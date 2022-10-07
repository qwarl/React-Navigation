
import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Detail from "./Detail";
import Add from './AddFCL';
import Update from './UpdateFCL';

const Stack = createStackNavigator();

export default function Fcl() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}}/>
        <Stack.Screen name="Add" component={Add} options={{headerShown:false}}/>
        <Stack.Screen name="Update" component={Update} options={{headerShown:false}}/>
      </Stack.Navigator>
    //  </NavigationContainer> 
  )
}