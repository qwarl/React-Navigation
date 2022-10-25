import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeTabDoor from "./checkprice/HomeTabDoor";
import DetailDoor from "./DetailDoor";
import AddDoor from "./AddDoor";
import UpdateDoor from "./UpdateDoor";
import AddCheckPriceDoor from "./checkprice/AddCheckPriceDoor";
import AddDoorRequiteSale from "./checkprice/AddDoorRequiteSale";

const Stack = createStackNavigator();

const ScreenDoor = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabDoor"
        component={HomeTabDoor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCheckPriceDoor"
        component={AddCheckPriceDoor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDoorRequiteSale"
        component={AddDoorRequiteSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailDoor"
        component={DetailDoor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDoor"
        component={AddDoor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateDoor"
        component={UpdateDoor}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    //  </NavigationContainer>
  );
};

export default ScreenDoor;
