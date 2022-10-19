import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeImport from "./HomeImport";
import CheckPriceImport from "./CheckPriceImport";
const Tab = createBottomTabNavigator();

const HomeTabImport = () => {
  return (
    <Tab.Navigator
    // tabBarOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    // screenOptions={{ headerStyle: { backgroundColor: "papayawhip" } }}
    >
      <Tab.Screen
        name="HomeImport"
        component={HomeImport}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="CheckPriceImport"
        component={CheckPriceImport}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabImport;
