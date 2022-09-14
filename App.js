import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Fcl from "./screens/ScreenFCL";
import ScreenLog from "./screens/LogDepartment/ScreenLog";
import color from "./contains/color";

const Stack = createStackNavigator();

export default function App() {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={Home}/>
  //       <Stack.Screen name="Detail" component={View}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      <ScreenLog />
    </>
    // <Fcl/>
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
