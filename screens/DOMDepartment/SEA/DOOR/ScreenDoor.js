import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import HomeDoor from './HomeDoor';
import DetailDoor from './DetailDoor';
import AddDoor from './AddDoor';
import UpdateDoor from './UpdateDoor';

const Stack = createStackNavigator();

const ScreenDoor = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='HomeDoor' component={HomeDoor}/>
        <Stack.Screen name='DetailDoor' component={DetailDoor}/>
        <Stack.Screen name='AddDoor' component={AddDoor}/>
        <Stack.Screen name='UpdateDoor' component={UpdateDoor}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default ScreenDoor