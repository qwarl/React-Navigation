import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeDoor from "../HomeDoor";
import CheckPriceDoor from "./CheckPriceDoor";
const Tab = createBottomTabNavigator();

const HomeTabDoor = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
      <Tab.Screen
        name="HomeDoor"
        component={HomeDoor}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceDoor"
        component={CheckPriceDoor}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabDoor;
