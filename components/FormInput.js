import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

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
        height: 35,
        borderRadius: 8,
        fontSize: 14,
        padding:10,
        marginBottom: 10,
        marginLeft:20,
        marginRight:20
      },
})
export default FormInput