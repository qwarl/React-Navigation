import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeCy from "./HomeCy";
import DetailCy from "./DetailCy";
import AddCy from "./AddCy";
import UpdateCy from "./UpdateCy";
import HomeTabCy from "./checkprice/HomeTabCy";
import AddCyRequiteSale from "./checkprice/AddCyRequiteSale";
import AddCheckPriceCy from "./checkprice/AddCheckPriceCy";

const Stack = createStackNavigator();

const ScreenCy = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabCy"
        component={HomeTabCy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCyRequiteSale"
        component={AddCyRequiteSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCheckPriceCy"
        component={AddCheckPriceCy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailCy"
        component={DetailCy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCy"
        component={AddCy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateCy"
        component={UpdateCy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    //  </NavigationContainer>
  );
};

export default ScreenCy;
