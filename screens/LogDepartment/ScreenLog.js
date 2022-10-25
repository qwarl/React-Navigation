import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeLog from "./HomeLog";
import DetailLog from "./DetailLog";
import AddLog from "./AddLog";
import UpdateLog from "./UpdateLog";
import PolicyDetail from "./PolicyDetail";
import AddCheckPriceLog from "./checkprice/AddCheckPriceLog";
import AddLogRequiteSale from "./checkprice/AddLogRequiteSale";
import HomeTabLog from "./checkprice/HomeTabLog";

const Stack = createStackNavigator();

const ScreenLog = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabLog"
        component={HomeTabLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCheckPriceLog"
        component={AddCheckPriceLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLogRequiteSale"
        component={AddLogRequiteSale}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailLog"
        component={DetailLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLog"
        component={AddLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateLog"
        component={UpdateLog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PolicyDetail"
        component={PolicyDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ScreenLog;
