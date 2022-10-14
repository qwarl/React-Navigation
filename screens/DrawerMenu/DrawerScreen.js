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
        // const translateX = Animated.interpolateNode(progress, {
        //     inputRange: [0, 1],
        //     outputRange: [30, 0],
        // });
        // console.time('doSomething')
        const [open, setOpen] = useState(
            {
                openQuotation: false,
                openDOM: false,
                openInfo: false,
                openImport: false,
                openAir: false,
            }
        )
        console.log(open);
        // console.timeEnd('doSomething')
        return (
            <DrawerContentScrollView {...rest}>
                {/* <Animated.View
                    style={{ transform: [{ translateX }] }}
                > */}
                <View style={styles.mainMenu}>
                    <TouchableOpacity onPress={() => setOpen({ ...open, openQuotation: !open.openQuotation })} style={{ backgroundColor: 'rgb(172, 231, 250)' }}>
                        <Text style={{ color: 'red', fontSize: 20 }}>
                            Bảng giá
                        </Text>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        {open.openQuotation ? (

                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenFCL'); setOpen(!open.openQuotation) }}>
                                    <Text style={{ fontSize: 20, opacity: 80 }}>FCL Department</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setOpen({ ...open, openImport: !open.openImport }) }}>
                                    <Text style={{ fontSize: 20 }}>IMPORT Department</Text>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 20 }}>
                                    {open.openImport ? (

                                        <View >
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenImport'); setOpen(!open.openImport) }}>
                                                <Text style={{ fontSize: 20 }}>ImportD</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenImportLCL'); setOpen(!open.openImport) }}>
                                                <Text style={{ fontSize: 20 }}>ImportLCL</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenLog'); }}>
                                    <Text style={{ fontSize: 20 }}>LOG Department</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setOpen({ ...open, openAir: !open.openAir })}>
                                    <Text style={{ fontSize: 20 }}>AIR Department</Text>
                                </TouchableOpacity>
                                <View>
                                    {open.openAir ? (

                                        <View style={{ marginLeft: 20 }}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenLCL'); setOpen({ ...open, openAir: !open.openAir }) }}>
                                                <Text style={{ fontSize: 20 }}>LCL</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenAIR'); setOpen({ ...open, openAir: !open.openAir }) }}>
                                                <Text style={{ fontSize: 20 }}>AIR</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                                <TouchableOpacity onPress={() => { setOpen({...open,openDOM:!open.openDOM}) }}>
                                    <Text style={{ fontSize: 20 }}>DOM Department</Text>
                                </TouchableOpacity>
                                <View>
                                    {open.openDOM ? (

                                        <View style={{ marginLeft: 20 }}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenCy'); setOpen({...open,openDOM:!open.openDOM}) }}>
                                                <Text style={{ fontSize: 20 }}>CY</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenDoor'); setOpen({...open,openDOM:!open.openDOM}) }}>
                                                <Text style={{ fontSize: 20 }}>DOOR</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { navigation.navigate('ScreenTruck'); setOpen({...open,openDOM:!open.openDOM}) }}>
                                                <Text style={{ fontSize: 20 }}>TRUCK</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                            </View>

                        ) : null}
                    </View>
                    <TouchableOpacity onPress={() => { setOpen({...open,openInfo:!open.openInfo}) }}>
                        <Text style={{ color: 'red', fontSize: 20 }}>
                            Tạo Thông Tin
                        </Text>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        {open.openInfo ? (

                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('Add'); setOpen({...open,openInfo:!open.openInfo}) }}>
                                    <Text style={{ fontSize: 20 }}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenFCL'); setOpen({...open,openInfo:!open.openInfo}) }}>
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
    mainMenu: {
        // marginLeft:20,
        padding: 5,
        // backgroundColor: 'rgb(172, 231, 250)'
    },
})