import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import color from "../contains/color";

const FormInput = (props) => {
  const { inputType, placeholder, label, error } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{label}</Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput
        {...props}
        keyboardType={inputType}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={"black"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    fontSize: 14,
    padding: 5,
    marginBottom: 10,
    height: 50,
    marginLeft: 17,
    marginRight: 17,
    borderBottomWidth: 1,
  },
});
export default FormInput;
