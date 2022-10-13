import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import ScreenFCL from '../FCLDepartment/ScreenFCL';
import ScreenLog from '../LogDepartment/ScreenLog';
import ScreenAIR from '../AIRDepartment/ScreenAIR';
import Add from '../FCLDepartment/AddFCL';
import UpdateFCL from '../FCLDepartment/UpdateFCL';
import ScreenImport from '../ImportDeparment/ImportD/ScreenImport';
import ScreenImportLCL from '../ImportDeparment/ImportLCL/ScreenImportLCL';
import ScreenLCL from '../AIRDepartment/LCL/ScreenLCL';
import ScreenCy from '../DOMDepartment/SEA/CY/ScreenCy';
import ScreenDoor from '../DOMDepartment/SEA/DOOR/ScreenDoor';
import ScreenTruck from '../DOMDepartment/Truck/ScreenTruck';
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {

    function CustomDrawerContent({ navigation, progress, ...rest }) {
        const translateX = Animated.interpolateNode(progress, {
            inputRange: [0, 1],
            outputRange: [30, 0],
        });
        const [openQuotation, setOpenQuotation] = useState(false)
        const [openDOM, setOpenDOM] = useState(false)
        const [openInfo, setOpenInfo] = useState(false)
        const [openImport, setOpenImport] = useState(false)
        const [openAir, setOpenAir] = useState(false)

        return (
            <DrawerContentScrollView {...rest}>
                {/* <Animated.View
                    style={{ transform: [{ translateX }] }}
                > */}
                <View style={styles.mainMenu}>
                    <TouchableOpacity onPress={() => { setOpenQuotation(!openQuotation) }} style={{ backgroundColor: 'rgb(172, 231, 250)' }}>
                        <Text style={{ color: 'red', fontSize: 20 }}>
                            Bảng giá
                        </Text>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        {openQuotation ? (

                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenFCL'); setOpenQuotation(!openQuotation) }}>
                                    <Text style={{ fontSize: 20, opacity: 80 }}>FCL Department</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setOpenImport(!openImport) }}>
                                    <Text style={{ fontSize: 20 }}>IMPORT Department</Text>
                                </TouchableOpacity>
                                <View style={{marginLeft:20}}>
                                    {openImport ? (

                                        <View >
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenImport'); setOpenImport(!openImport) }}>
                                                <Text style={{ fontSize: 20 }}>ImportD</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenImportLCL'); setOpenImport(!openImport) }}>
                                                <Text style={{ fontSize: 20 }}>ImportLCL</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenLog'); }}>
                                    <Text style={{ fontSize: 20 }}>LOG Department</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setOpenAir(!openAir)}>
                                    <Text style={{ fontSize: 20 }}>AIR Department</Text>
                                </TouchableOpacity>
                                <View>
                                    {openAir ? (

                                        <View style={{ marginLeft: 20 }}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenLCL'); setOpenAir(!openAir) }}>
                                                <Text style={{ fontSize: 20 }}>LCL</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenAIR'); setOpenAir(!openAir) }}>
                                                <Text style={{ fontSize: 20 }}>AIR</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                                <TouchableOpacity onPress={() => { setOpenDOM(!openDOM) }}>
                                    <Text style={{ fontSize: 20 }}>DOM Department</Text>
                                </TouchableOpacity>
                                <View>
                                    {openDOM ? (

                                        <View style={{ marginLeft: 20 }}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenCy');setOpenDOM(!openDOM) }}>
                                                <Text style={{ fontSize: 20 }}>CY</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenDoor');setOpenDOM(!openDOM) }}>
                                                <Text style={{ fontSize: 20 }}>DOOR</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenTruck');setOpenDOM(!openDOM) }}>
                                                <Text style={{ fontSize: 20 }}>TRUCK</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                            </View>

                        ) : null}
                    </View>
                    <TouchableOpacity onPress={() => { setOpenInfo(!openInfo) }}>
                        <Text style={{ color: 'red', fontSize: 20 }}>
                            Tạo Thông Tin
                        </Text>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        {openInfo ? (

                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('Add'); setOpenInfo(!openInfo) }}>
                                    <Text style={{ fontSize: 20 }}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenFCL'); setOpenInfo(!openInfo) }}>
                                    <Text style={{ fontSize: 20 }}>UpdateFCL</Text>
                                </TouchableOpacity>
                            </View>

                        ) : null}
                    </View>
                </View>
                {/* </Animated.View> */}
            </DrawerContentScrollView>
        );
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="ScreenFCL" component={ScreenFCL} />
                <Drawer.Screen name="Add" component={Add} />
                <Drawer.Screen name="ScreenLog" component={ScreenLog} />
                <Drawer.Screen name="ScreenAIR" component={ScreenAIR} />
                <Drawer.Screen name="ScreenLCL" component={ScreenLCL} />
                <Drawer.Screen name='ScreenImport' component={ScreenImport} />
                <Drawer.Screen name='ScreenImportLCL' component={ScreenImportLCL} />
                <Drawer.Screen name='ScreenCy' component={ScreenCy} />
                <Drawer.Screen name='ScreenDoor' component={ScreenDoor} />
                <Drawer.Screen name='ScreenTruck' component={ScreenTruck} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerScreen

const styles = StyleSheet.create({
    mainMenu:{
        // marginLeft:20,
padding:5,
// backgroundColor: 'rgb(172, 231, 250)'
    },
})