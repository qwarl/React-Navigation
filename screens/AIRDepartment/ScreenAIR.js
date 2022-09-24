import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import HomeAir from './HomeAir';
import DetailAir from './DetailAir';
import UpdateAir from './UpdateAir';
import AddAir from './AddAir';


const Stack = createStackNavigator();

const ScreenAIR = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='HomeAir' component={HomeAir}/>
        <Stack.Screen name='DetailAir' component={DetailAir}/>
        <Stack.Screen name='AddAir' component={AddAir}/>
        <Stack.Screen name='UpdateAir' component={UpdateAir}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default ScreenAIR