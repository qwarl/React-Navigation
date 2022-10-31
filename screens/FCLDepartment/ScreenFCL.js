import React from "react";
import { Button, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Detail from "./Detail";
import Add from "./AddFCL";
import Update from "./UpdateFCL";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

export default function Fcl({ navigation }) {
  // reload the page when the user click on the icon
  function clearFilter() {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
  }
  //add icon
  function LogoTitle() {
    return (
      <TouchableOpacity onPress={clearFilter}>
        <FontAwesome5 icon="far fa-redo" />
      </TouchableOpacity>
    );
  }

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="Add" component={Add} options={{ headerShown: false }} />
      <Stack.Screen name="Update" component={Update} options={{ headerShown: false }} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
