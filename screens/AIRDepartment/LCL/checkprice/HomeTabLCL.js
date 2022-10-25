import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import CheckPriceLCL from "./CheckPriceLCL";
import HomeLCL from "./../HomeLCL";
const Tab = createBottomTabNavigator();

const HomeTabLCL = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeAir"
        component={HomeLCL}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceLCL"
        component={CheckPriceLCL}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabLCL;
