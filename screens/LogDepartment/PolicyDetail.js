import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const PolicyDetail = ({ route }) => {
    const [policyInfo, setPolicyInfo] = useState(route.params.data);
  return (
    <View>
      <ScrollView style={styles.layoutStyle}>
        <Text style={styles.textStyle}>{policyInfo.policy}</Text>
      </ScrollView>
    </View>
  )
}
 const styles = StyleSheet.create({
    textStyle:{
        fontSize: 18,
    },
    layoutStyle:{
        padding:10,
        margin:10,
    },
 })
export default PolicyDetail