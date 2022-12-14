import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeBookingLog from "./HomeBookingLog";
import DetailBooking from "./DetailBooking";
import AddBookingLog from "./AddBookingLog";
import UpdateBooking from "./UpdateBooking";
import NewAddBooking from "./NewAddBooking";
import ProfitReport from "./report/ProfitReport";
import AddBuyDetail from "./report/AddBuyDetail";
import AddSellDetail from "./report/AddSellDetail";
import TabHomeAndReportLog from './report/tab.home.and.report.log'
import ProfitReportScreen from "./report/ProfitReportScreen";
import AddExchangeRate from "./report/change.to.sub.screen/AddExchangeRate";
import ItemSellDetails from "./report/change.to.sub.screen/Item.Sell.Details";
import ItemBuyDetails from "./report/change.to.sub.screen/Item.Buy.Details";
import PaidOn from "./report/change.to.sub.screen/PaidOn";
const Stack = createStackNavigator();

const ScreenBooking = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabHomeAndReportLog"
        component={TabHomeAndReportLog}
        // options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="HomeBookingLog"
        component={HomeBookingLog}
        // options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="DetailBooking"
        component={DetailBooking}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBookingLog"
        component={AddBookingLog}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateBooking"
        component={UpdateBooking}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewAddBooking"
        component={NewAddBooking}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfitReport"
        component={ProfitReport}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBuyDetail"
        component={AddBuyDetail}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddSellDetail"
        component={AddSellDetail}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
      name='ProfitReportScreen'
      component={ProfitReportScreen}
      />
      <Stack.Screen
      name='AddExchangeRate'
      component={AddExchangeRate}
      />
      <Stack.Screen
      name='ItemSellDetails'
      component={ItemSellDetails}
      />
      <Stack.Screen
      name='ItemBuyDetails'
      component={ItemBuyDetails}
      />
      <Stack.Screen
      name='PaidOn'
      component={PaidOn}
      />
    </Stack.Navigator>
  );
};

export default ScreenBooking;
