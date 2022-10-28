import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import CheckPriceTruck from "./CheckPriceTruck";
import HomeTruck from "./../HomeTruck";
const Tab = createBottomTabNavigator();

const HomeTabTruck = () => {
  return (
    <Tab.Navigator
      screenOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeTruck"
        component={HomeTruck}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceTruck"
        component={CheckPriceTruck}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabTruck;
