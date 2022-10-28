import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();
import HomeLog from "./../HomeLog";
import CheckPriceLog from "./CheckPriceLog";

const HomeTabLog = () => {
  return (
    <Tab.Navigator
      screenOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeLog"
        component={HomeLog}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceLog"
        component={CheckPriceLog}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabLog;
