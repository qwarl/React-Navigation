import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ItemPaidOnDetailsInfo = ({route,navigation}) => {
  const id=route.params.data
  console.log('id',id);
  return (
    <View>
      <Text>ItemPaidOnDetailsInfo</Text>
    </View>
  );
};

export default ItemPaidOnDetailsInfo;

const styles = StyleSheet.create({});
