import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeBookingLog from "./HomeBookingLog";
import DetailBooking from "./DetailBooking";
import AddBookingLog from "./AddBookingLog";
import UpdateBooking from "./UpdateBooking";
import NewAddBooking from "./NewAddBooking";
const Stack = createStackNavigator();

const ScreenBooking = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeBookingLog"
        component={HomeBookingLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailBooking"
        component={DetailBooking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBookingLog"
        component={AddBookingLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateBooking"
        component={UpdateBooking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewAddBooking"
        component={NewAddBooking}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ScreenBooking;