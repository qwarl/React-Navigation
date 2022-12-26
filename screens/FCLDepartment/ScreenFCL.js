import React from "react";
import { Button, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Detail from "./Detail";
import Add from "./AddFCL";
import Update from "./UpdateFCL";
import HomeTabFCL from "./checkprice/HomeTabFCL";
import AddCheckPriceFCL from "./checkprice/AddCheckPriceFCL";
import AddFCLRequiteSale from "./checkprice/AddFCLRequiteSale";

const Stack = createStackNavigator();

export default function Fcl({ navigation }) {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabFCL"
        component={HomeTabFCL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCheckPriceFCL"
        component={AddCheckPriceFCL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddFCLRequiteSale"
        component={AddFCLRequiteSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update"
        component={Update}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
