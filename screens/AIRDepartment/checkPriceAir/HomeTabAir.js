import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeAir from "../HomeAir";
import CheckPriceAir from "./CheckPriceAir";
const Tab = createBottomTabNavigator();

const HomeTabAir = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeAir"
        component={HomeAir}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceAir"
        component={CheckPriceAir}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabAir;
