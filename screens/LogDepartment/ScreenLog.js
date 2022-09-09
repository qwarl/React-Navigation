import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeLog from './HomeLog';
import DetailLog from './DetailLog';
import AddLog from './AddLog';
import UpdateLog from './UpdateLog';

const Stack = createStackNavigator();

const ScreenLog = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='HomeLog' component={HomeLog}/>
        <Stack.Screen name='DetailLog' component={DetailLog}/>
        <Stack.Screen name='AddLog' component={AddLog}/>
        <Stack.Screen name='UpdateLog' component={UpdateLog}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default ScreenLog
