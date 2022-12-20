import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ItemBuyDetailsInfo = ({route,navigation}) => {
  const id=route.params.data
  console.log('id',id);
  return (
    <View>
      <Text>ItemBuyDetailsInfo</Text>
    </View>
  );
};

export default ItemBuyDetailsInfo;

const styles = StyleSheet.create({});
