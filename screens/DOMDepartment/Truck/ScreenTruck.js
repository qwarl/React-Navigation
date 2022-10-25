import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeTruck from "./HomeTruck";
import DetailTruck from "./DetailTruck";
import AddTruck from "./AddTruck";
import UpdateTruck from "./UpdateTruck";
import HomeTabTruck from "./checkprice/HomeTabTruck";
import AddCheckPriceTruck from "./checkprice/AddCheckPriceTruck";
import AddTruckRequiteSale from "./checkprice/AddTruckRequiteSale";

const Stack = createStackNavigator();

const ScreenTruck = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabTruck"
        component={HomeTabTruck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCheckPriceTruck"
        component={AddCheckPriceTruck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTruckRequiteSale"
        component={AddTruckRequiteSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailTruck"
        component={DetailTruck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTruck"
        component={AddTruck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateTruck"
        component={UpdateTruck}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    //  </NavigationContainer>
  );
};

export default ScreenTruck;
