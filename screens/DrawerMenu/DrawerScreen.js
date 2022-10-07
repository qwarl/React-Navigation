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
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {

    function CustomDrawerContent({ navigation, progress, ...rest }) {
        const translateX = Animated.interpolateNode(progress, {
            inputRange: [0, 1],
            outputRange: [30, 0],
        });
        const [openQuotation, setOpenQuotation] = useState(false)
        const [openDOM, setOpenDOM] = useState(false)
        const [opInfo, setOpenInfo] = useState(false)

        return (
            <DrawerContentScrollView {...rest}>
                {/* <Animated.View
                    style={{ transform: [{ translateX }] }}
                > */}
                <View>
                    <TouchableOpacity onPress={() => { setOpenQuotation(!openQuotation) }} style={{backgroundColor:'rgb(172, 231, 250)'}}>
                        <Text style={{ color: 'red', fontSize: 20 }}>
                            Bảng giá
                        </Text>
                    </TouchableOpacity>
                    <View>
                        {openQuotation ? (

                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('Add'); setOpenQuotation(!openQuotation) }}>
                                    <Text style={{ fontSize: 20,opacity:80 }}>FCL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setOpenDOM(!openDOM) }}>
                                    <Text style={{ fontSize: 20, marginLeft: 5 }}>DOM</Text>
                                </TouchableOpacity>
                                <View>
                                    {openDOM ? (

                                        <View>
                                            <TouchableOpacity onPress={() => { Alert.alert('nút này chưa làm'); setOpenDOM(!openDOM) }}>
                                                <Text style={{ fontSize: 20 }}>  Cy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { Alert.alert('nút này chưa làm'); setOpenDOM(!openDOM) }}>
                                                <Text style={{ fontSize: 20 }}>  Door</Text>
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity onPress={() => { navigation.navigate('ScreenLog') }}> */}
                                            <TouchableOpacity onPress={() => { Alert.alert('nút này chưa làm'); setOpenDOM(!openDOM) }}>
                                                <Text style={{ fontSize: 20 }}>  Screen</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : null}
                                </View>
                                {/* <TouchableOpacity onPress={() => { navigation.navigate('ScreenLog') }}> */}
                                <TouchableOpacity onPress={() => { Alert.alert('nút này chưa làm') }}>
                                    <Text style={{ fontSize: 20 }}>Import</Text>
                                </TouchableOpacity>
                            </View>

                        ) : null}
                    </View>
                    <TouchableOpacity onPress={() => { setOpenInfo(!opInfo) }}>
                        <Text style={{ color: 'red', fontSize: 20 }}>
                            Tạo Thông Tin
                        </Text>
                    </TouchableOpacity>
                    <View>
                        {opInfo ? (

                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('Add'); setOpenInfo(!opInfo) }}>
                                    <Text style={{ fontSize: 20 }}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('ScreenLog'); setOpenInfo(!opInfo) }}>
                                    <Text style={{ fontSize: 20 }}>Log</Text>
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
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerScreen

const styles = StyleSheet.create({})