
import React from 'react'
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ScreenLog = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeLog" component={Home}/>
        <Stack.Screen name="DetailLog" component={Detail}/>
        <Stack.Screen name="AddLog" component={Add}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ScreenLog