import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenLog from "./screens/LogDepartment/ScreenLog";
import color from "./contains/color";
import ScreenAIR from "./screens/AIRDepartment/ScreenAIR";
import ScreenLCL from "./screens/AIRDepartment/LCL/ScreenLCL";
import ScreenTruck from "./screens/DOMDepartment/Truck/ScreenTruck";
import ScreenCy from "./screens/DOMDepartment/SEA/CY/ScreenCy";
import Fcl from "./screens/FCLDepartment/ScreenFCL";
import DrawerScreen from "./screens/DrawerMenu/DrawerScreen";
import ScreenDoor from "./screens/DOMDepartment/SEA/DOOR/ScreenDoor";
import ScreenImport from "./screens/ImportDeparment/ImportD/ScreenImport";
import ScreenImportLCL from "./screens/ImportDeparment/ImportLCL/ScreenImportLCL";
import BusinessMainScreen from "./screens/DrawerMenu/BusinessMainScreen";
import TestPicker from "./screens/LogDepartment/booking/TestPicker";
import AddPriceSell from "./screens/LogDepartment/profitreport/AddPriceSell";
import ScreenAdvance from "./screens/LogDepartment/advance/ScreenAdvance";
import ScreenBooking from "./screens/LogDepartment/booking/ScreenBooking";
import DetailAdvance from "./screens/LogDepartment/advance/DetailAdvance";
import PaymentLog from "./screens/LogDepartment/formLog/PaymentLog";
import ReceiptLog from "./screens/LogDepartment/formLog/ReceiptLog";
import AddReceiptLog from "./screens/LogDepartment/formLog/AddReceiptLog";
// import ScreenAIR from "./screens/AIRDepartment/ScreenAIR";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      {/* <ScreenLog /> */}
      {/* <Fcl /> */}
      {/* <ScreenLCL/> */}
      {/* <ScreenTruck/> */}
      {/* <ScreenCy/> */}
      {/* <ScreenDoor/> */}
      {/* <ScreenAIR/> */}
      {/* <DrawerScreen /> */}
      {/* <ScreenAdvance /> */}
      <ReceiptLog />
      {/* <AddReceiptLog /> */}
      {/* <PaymentLog /> */}
      {/* <DetailAdvance /> */}
      {/* <ScreenBooking /> */}
      {/* <AddPriceSell /> */}
      {/* <ScreenImport /> */}
      {/* <ScreenImportLCL/> */}
      {/* <BusinessMainScreen /> */}
      {/* <TestPicker /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
