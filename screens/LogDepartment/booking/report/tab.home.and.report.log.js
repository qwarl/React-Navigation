import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import HomeBookingLog from '../HomeBookingLog'
import ProfitReportScreen from './ProfitReportScreen'
import WatchAndUpdateReport from "./WatchAndUpdateReport";
const TabHomeAndReportLog = () => {
  return (
    <Tab.Navigator
        screenOptions={{ labelStyle: { fontSize: 16, marginBottom: 5 } }}
    >
        <Tab.Screen
        name="HomeBookingLog"
        component={HomeBookingLog}
        options={{
          headerShown: false,
        //   tabBarIcon: () => <Icon name="home" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="ProfitReportScreen"
        component={ProfitReportScreen}
        options={{
          headerShown: false,
        //   tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
      <Tab.Screen
        name="WatchAndUpdateReport"
        component={WatchAndUpdateReport}
        options={{
          headerShown: false,
        //   tabBarIcon: () => <Icon name="check" size={20} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabHomeAndReportLog;

const styles = StyleSheet.create({});
