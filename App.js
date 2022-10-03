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
// import ScreenAIR from "./screens/AIRDepartment/ScreenAIR";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      {/* <ScreenLog /> */}
       {/* <Fcl/> */}
       {/* <ScreenAIR/> */}
       {/* <ScreenLCL/> */}
       {/* <ScreenTruck/> */}
       {/* <ScreenCy/> */}
      <Fcl />
      {/* <ScreenAIR/> */}
      {/* <DrawerScreen/> */}
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
