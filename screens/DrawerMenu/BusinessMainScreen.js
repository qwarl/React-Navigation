import { View, Image } from "react-native";
import React from "react";

const BusinessMainScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
      }}
    >
      <Image source={require("./../../assets/BusinessMainScreen.png")} />
    </View>
  );
};

export default BusinessMainScreen;
