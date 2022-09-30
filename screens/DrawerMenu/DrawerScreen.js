import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../FCLDepartment/Home';
import HomeLog from '../LogDepartment/HomeLog';
import HomeAir from '../AIRDepartment/HomeAir';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="HomeFcl">
                <Drawer.Screen name="HomeFcl" component={Home} />
                <Drawer.Screen name="HomeLog" component={HomeLog} />
                <Drawer.Screen name="HomeAir" component={HomeAir} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerScreen

const styles = StyleSheet.create({})