import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import HomeCy from './HomeCy';
import DetailCy from './DetailCy';
import AddCy from './AddCy';
import UpdateCy from './UpdateCy';

const Stack = createStackNavigator();

const ScreenCy = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='HomeCy' component={HomeCy}/>
        <Stack.Screen name='DetailCy' component={DetailCy}/>
        <Stack.Screen name='AddCy' component={AddCy}/>
        <Stack.Screen name='UpdateCy' component={UpdateCy}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default ScreenCy