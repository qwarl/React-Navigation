import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";

const PolicyDetail = ({ route }) => {
  const [policyInfo, setPolicyInfo] = useState(route.params.data);
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView style={styles.layoutStyle}>
        <Text style={styles.textStyle}>{policyInfo.policy}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  layoutStyle: {
    padding: 10,
    margin: 16,
  },
});
export default PolicyDetail;
