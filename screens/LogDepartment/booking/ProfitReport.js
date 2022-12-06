import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const ProfitReport = ({ route, navigation }) => {
  const [data, setData] = useState(route.params);
  console.log('data',data);
  return (
    <View>
      <Text>ProfitReport</Text>
    </View>
  );
};

export default ProfitReport;

const styles = StyleSheet.create({});
