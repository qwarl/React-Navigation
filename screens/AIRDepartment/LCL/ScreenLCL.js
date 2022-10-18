import { View, Text } from "react-native";
import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeLCL from "./HomeLCL";
import DetailLCL from "./DetailLCL";
import AddLCL from "./AddLCL";
import UpdateLCL from "./UpdateLCL";

const Stack = createStackNavigator();

const ScreenLCL = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeLCL"
        component={HomeLCL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailLCL"
        component={DetailLCL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLCL"
        component={AddLCL}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateLCL"
        component={UpdateLCL}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    //  </NavigationContainer>
  );
};

export default ScreenLCL;
