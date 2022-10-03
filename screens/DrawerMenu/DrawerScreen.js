import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenFCL from '../FCLDepartment/ScreenFCL';
import ScreenLog from '../LogDepartment/ScreenLog';
import ScreenAIR from '../AIRDepartment/ScreenAIR';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="ScreenFCL" component={ScreenFCL} />
                <Drawer.Screen name="ScreenLog" component={ScreenLog} />
                <Drawer.Screen name="ScreenAIR" component={ScreenAIR} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerScreen

const styles = StyleSheet.create({})