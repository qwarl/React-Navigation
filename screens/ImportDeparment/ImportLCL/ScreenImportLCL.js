import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import DetailImportLCL from "./DetailImportLCL";
import AddImportLCL from "./AddImportLCL";
import UpdateImportLCL from "./UpdateImportLCL";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabImportLCL from "./checkprice/HomeTabImportLCL";
import AddCheckPriceImportLCL from "./checkprice/AddCheckPriceImportLCL";
import AddRequiteSale from "./checkprice/AddRequiteSale";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ScreenImportLCL = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabImportLCL"
          component={HomeTabImportLCL}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddCheckPriceImportLCL"
          component={AddCheckPriceImportLCL}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddRequiteSale"
          component={AddRequiteSale}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailImportLCL"
          component={DetailImportLCL}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddImportLCL"
          component={AddImportLCL}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateImportLCL"
          component={UpdateImportLCL}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default ScreenImportLCL;
