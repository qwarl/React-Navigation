import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "./SignIn";
import StartScreen from "./StartScreen";
import SignUp from "./SignUp";
const Stack = createStackNavigator();
const ScreenSignIn = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Plash Screen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Đăng Nhập" component={SignIn} />
        <Stack.Screen name="Đăng Ký" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenSignIn;

const styles = StyleSheet.create({});
