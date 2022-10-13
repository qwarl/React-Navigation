import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeImportLCL from "./HomeImportLCL";
import CheckPriceImportLCL from "./CheckPriceImportLCL";
import Icon from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();

const HomeTabImportLCL = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeImportLCL"
        component={HomeImportLCL}
        options={{
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceImportLCL"
        component={CheckPriceImportLCL}
        options={{
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabImportLCL;
