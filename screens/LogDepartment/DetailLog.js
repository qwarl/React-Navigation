import { View, Text } from 'react-native'
import React, { useState } from 'react'

const DetailLog = ({route}) => {
  const[data, setData] = useState(route.params.logInfo);
  console.log(data);
  return (
    <View>
      <Text>DetailLog</Text>
    </View>
  )
}

export default DetailLog