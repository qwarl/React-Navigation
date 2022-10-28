import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import ScreenFCL from "../FCLDepartment/ScreenFCL";
import ScreenLog from "../LogDepartment/ScreenLog";
import ScreenAIR from "../AIRDepartment/ScreenAIR";
import Add from "../FCLDepartment/AddFCL";
import UpdateFCL from "../FCLDepartment/UpdateFCL";
import ScreenImport from "../ImportDeparment/ImportD/ScreenImport";
import ScreenImportLCL from "../ImportDeparment/ImportLCL/ScreenImportLCL";
import ScreenLCL from "../AIRDepartment/LCL/ScreenLCL";
import ScreenCy from "../DOMDepartment/SEA/CY/ScreenCy";
import ScreenDoor from "../DOMDepartment/SEA/DOOR/ScreenDoor";
import ScreenTruck from "../DOMDepartment/Truck/ScreenTruck";
import color from "../../contains/color";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Feather";
import BusinessMainScreen from "./BusinessMainScreen";
import * as Updates from "expo-updates"

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  function CustomDrawerContent({ navigation, progress, route, ...rest }) {
    // const translateX = Animated.interpolateNode(progress, {
    //     inputRange: [0, 1],
    //     outputRange: [30, 0],
    // });
    // console.time('doSomething')
    const [open, setOpen] = useState({
      openQuotation: false,
      openDOM: false,
      openInfo: false,
      openImport: false,
      openAir: false,
      openHome: false,
    });
    // console.log(open);
    // console.timeEnd('doSomething')
    return (
      <DrawerContentScrollView {...rest}>
        {/* <Animated.View
                    style={{ transform: [{ translateX }] }}
                > */}
        <View style={styles.mainMenu}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Nghiệp Vụ")}
          // style={{ backgroundColor: "rgb(172, 231, 250)" }}
          >
            <Icon
              name="home"
              size={28}
              color={color.primary}
              style={{ position: "absolute", left: 16, zIndex: 1000 }}
            />
            <Text
              style={{ color: color.primary, fontSize: 20, marginLeft: 50 }}
            >
              TRANG CHỦ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setOpen({ ...open, openQuotation: !open.openQuotation })
            }
          // style={{ backgroundColor: "rgb(172, 231, 250)" }}
          >
            <Icon1
              name="clipboard"
              size={28}
              color={color.primary}
              style={{
                position: "absolute",
                left: 16,
                zIndex: 1000,
                marginTop: 16,
              }}
            />
            <Text
              style={{
                color: color.primary,
                fontSize: 20,
                marginLeft: 50,
                marginTop: 16,
              }}
            >
              BẢNG GIÁ
            </Text>
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            {open.openQuotation ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('ScreenFCL',{f5:Math.random()})
                    navigation.reset({ index: 0, routes: [{ name: 'ScreenFCL' }] })
                    setOpen(!open.openQuotation);
                  }}
                >
                  <Text style={{ fontSize: 20, opacity: 80, marginTop: 16 }}>
                    FCL Department
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOpen({ ...open, openImport: !open.openImport });
                  }}
                >
                  <Text style={{ fontSize: 20, marginTop: 16 }}>
                    IMPORT Department
                  </Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 20 }}>
                  {open.openImport ? (
                    <View
                      style={{
                        borderLeftWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        marginRight: 5,
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenImport");
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenImport' }] })
                          setOpen(!open.openImport);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 10,
                          }}
                        >
                          Import
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenImportLCL");
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenImportLCL' }] })
                          setOpen(!open.openImport);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginTop: 15,
                            marginLeft: 10,
                          }}
                        >
                          ImportLCL
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("ScreenLog");
                    navigation.reset({ index: 0, routes: [{ name: 'ScreenLog' }] })
                  }}
                >
                  <Text style={{ fontSize: 20, marginTop: 16 }}>
                    LOG Department
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOpen({ ...open, openAir: !open.openAir })}
                >
                  <Text style={{ fontSize: 20, marginTop: 16 }}>
                    AIR Department
                  </Text>
                </TouchableOpacity>
                <View>
                  {open.openAir ? (
                    <View
                      style={{
                        marginLeft: 20,
                        borderLeftWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        marginRight: 5,
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenLCL");
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenLCL' }] })
                          setOpen({ ...open, openAir: !open.openAir });
                        }}
                      >
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>
                          LCL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenAIR");
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenAIR' }] })
                          setOpen({ ...open, openAir: !open.openAir });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop: 15,
                          }}
                        >
                          AIR
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setOpen({ ...open, openDOM: !open.openDOM });
                  }}
                >
                  <Text style={{ fontSize: 20, marginTop: 16 }}>
                    DOM Department
                  </Text>
                </TouchableOpacity>
                <View>
                  {open.openDOM ? (
                    <View
                      style={{
                        marginLeft: 20,
                        borderLeftWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        marginRight: 5,
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenCy");
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenCy' }] })
                          setOpen({ ...open, openDOM: !open.openDOM });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 10,
                          }}
                        >
                          CY
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenDoor");
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenDoor' }] })
                          setOpen({ ...open, openDOM: !open.openDOM });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop: 15,
                          }}
                        >
                          DOOR
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("ScreenTruck")
                          navigation.reset({ index: 0, routes: [{ name: 'ScreenTruck' }] })
                          setOpen({ ...open, openDOM: !open.openDOM });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop: 15,
                          }}
                        >
                          TRUCK
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => {
              setOpen({ ...open, openInfo: !open.openInfo });
            }}
          >
            <Icon
              name="addfolder"
              size={28}
              color={color.primary}
              style={{
                position: "absolute",
                left: 16,
                zIndex: 1000,
                marginTop: 16,
              }}
            />
            <Text
              style={{
                color: color.primary,
                fontSize: 20,
                marginLeft: 50,
                marginTop: 16,
              }}
            >
              TẠO THÔNG TIN
            </Text>
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            {open.openInfo ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("Add");
                    navigation.reset({ index: 0, routes: [{ name: 'Add' }] })
                    setOpen({ ...open, openInfo: !open.openInfo });
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("ScreenFCL");
                    navigation.reset({ index: 0, routes: [{ name: 'ScreenFCL' }] })
                    setOpen({ ...open, openInfo: !open.openInfo });
                  }}
                >
                  <Text style={{ fontSize: 20 }}>UpdateFCL</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
        {/* </Animated.View> */}
      </DrawerContentScrollView >
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="ScreenFCL" component={ScreenFCL} />
        <Drawer.Screen name="Nghiệp Vụ" component={BusinessMainScreen} />
        <Drawer.Screen name="Add" component={Add} />
        <Drawer.Screen name="ScreenLog" component={ScreenLog} />
        <Drawer.Screen name="ScreenAIR" component={ScreenAIR} />
        <Drawer.Screen name="ScreenLCL" component={ScreenLCL} />
        <Drawer.Screen name="ScreenImport" component={ScreenImport} />
        <Drawer.Screen name="ScreenImportLCL" component={ScreenImportLCL} />
        <Drawer.Screen name="ScreenCy" component={ScreenCy} />
        <Drawer.Screen name="ScreenDoor" component={ScreenDoor} />
        <Drawer.Screen name="ScreenTruck" component={ScreenTruck} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  mainMenu: {
    marginTop: 60,
    padding: 5,
    // backgroundColor: 'rgb(172, 231, 250)'
  },
});
