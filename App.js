import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenLog from "./screens/LogDepartment/ScreenLog";
import color from "./contains/color";
import Fcl from "./screens/FCLDepartment/ScreenFCL";
import DrawerScreen from "./screens/DrawerMenu/DrawerScreen";
// import ScreenAIR from "./screens/AIRDepartment/ScreenAIR";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      {/* <ScreenLog /> */}
      {/* <Fcl /> */}
      {/* <ScreenAIR/> */}
      <DrawerScreen/>
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
