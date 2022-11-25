import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdvanceLog from "./AdvanceLog ";
import AddAdvance from "./AddAdvance ";
const Stack = createStackNavigator();

const ScreenAdvance = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AdvanceLog" component={AdvanceLog} />
        <Stack.Screen name="AddAdvance" component={AddAdvance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenAdvance;
