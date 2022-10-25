import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import CheckPriceCy from "./CheckPriceCy";
import HomeCy from "./../HomeCy";
const Tab = createBottomTabNavigator();

const HomeTabCy = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeCy"
        component={HomeCy}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceCy"
        component={CheckPriceCy}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabCy;
