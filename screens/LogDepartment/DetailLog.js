import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const DetailLog = ({ navigation ,route }) => {
  const [data, setData] = useState(route.params.item);
  console.log(data);

  return (
    <View style={styles.detail}>
      <Text style={styles.textDisplay}>Tháng: {data.month}</Text>
      <Text style={styles.textDisplay}>Loại Vận Chuyển: {data.freight}</Text>
      <Text style={styles.textDisplay}>Tên Hàng: {data.name}</Text>
      <Text style={styles.textDisplay}>H/S Code: {data.hsCode}</Text>
      <Text style={styles.textDisplay}>Công Dụng: {data.function}</Text>
      <Text style={styles.textDisplay}>Cảng Đi: {data.pol}</Text>
      <Text style={styles.textDisplay}>Cảng Đến: {data.pod}</Text>
      <Text style={styles.textDisplay}>Loại Hàng: {data.typeProduct}</Text>
      <Text style={styles.textDisplay}>Số lượng: {data.quantity}</Text>
      <Text style={styles.textDisplay}>Yêu Cầu Đặc Biệt: {data.requirement}</Text>
      <Text style={styles.textDisplay}>Loại Hàng: {data.typeProduct}</Text>
      <Text style={styles.textDisplay}>Giá: {data.price}</Text>
      <Text style={styles.textDisplay}>Loại Hình: {data.type}</Text>
      <TouchableOpacity 
        style={[styles.buttonInsert]} 
        onPress={() => {
          navigation.navigate("AddLog", {
            data: data,
          });
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Insert</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.buttonUpdate]}
        onPress={() => {
          navigation.navigate("UpdateLog", {
            data: data,
          });
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    borderRadius: 15,
    borderColor: "#000",
    backgroundColor: "#B1B5B5",
    marginBottom: 10,
    padding: 20,
  },
  textDisplay: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInsert: {
    height: 45,
    backgroundColor: "rgba(27,27,51,1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width:170,
    marginVertical:30,
    alignContent:'center',
  },
  buttonUpdate: {
    height: 45,
    backgroundColor: "rgba(27,27,51,1)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width:170,
    marginBottom:30,
  },
});

export default DetailLog;
