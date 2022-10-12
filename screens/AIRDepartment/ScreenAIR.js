import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeAir from "./HomeAir";
import DetailAir from "./DetailAir";
import UpdateAir from "./UpdateAir";
import AddAir from "./AddAir";

const Stack = createStackNavigator();

const ScreenAIR = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeAir" component={HomeAir} options={{ headerShown: false }} />
      <Stack.Screen name="DetailAir" component={DetailAir} options={{ headerShown: false }} />
      <Stack.Screen name="AddAir" component={AddAir} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateAir" component={UpdateAir} options={{ headerShown: false }} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default ScreenAIR;
