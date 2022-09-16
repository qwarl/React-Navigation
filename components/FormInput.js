import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import color from '../contains/color';

const FormInput = (props) => {
    const {placeholder,  label, error}  = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft:20 }}>{label}</Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#1b1b33",
        backgroundColor: color.backgroundInput,
        height: 35,
        borderRadius: 30,
        fontSize: 14,
        padding:10,
        marginBottom: 10,
        height:50,
        marginLeft:20,
        marginRight:20
      },
})
export default FormInput