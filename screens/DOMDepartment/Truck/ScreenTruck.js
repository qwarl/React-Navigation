import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import HomeTruck from './HomeTruck';
import DetailTruck from './DetailTruck';
import AddTruck from './AddTruck';
import UpdateTruck from './UpdateTruck';

const Stack = createStackNavigator();

const ScreenTruck = () => {
    
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='HomeTruck' component={HomeTruck}/>
        <Stack.Screen name='DetailTruck' component={DetailTruck}/>
        <Stack.Screen name='AddTruck' component={AddTruck}/>
        <Stack.Screen name='UpdateTruck' component={UpdateTruck}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default ScreenTruck