import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import color from "../../../contains/color";

const DetailTruck = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.item);
  return (
    <ScrollView>
    <View style={styles.detail}>
      <Text style={styles.textDisplayCode}>
        Mã Báo Giá: {data.code}
      </Text>
      <Text style={styles.textDisplay}>Tháng: {data.month}</Text>
      <Text style={styles.textDisplay}>Châu: {data.continent}</Text>
      <Text style={styles.textDisplay}>Loại Container: {data.container}</Text>
      <Text style={styles.textDisplay}>Loại Xe: {data.typetruck}</Text>
      <Text style={styles.textDisplay}>Tên Hàng: {data.productname}</Text>
      <Text style={styles.textDisplay}>Trọng Lượng: {data.weight}</Text>
      <Text style={styles.textDisplay}>SL Kiện: {data.quantitypallet}</Text>
      <Text style={styles.textDisplay}>SL Carton: {data.quantitycarton}</Text>
      <Text style={styles.textDisplay}>ĐC Lấy Hàng: {data.addressdelivery}</Text>
      <Text style={styles.textDisplay}>ĐC Nhận Hàng: {data.addressreceive}</Text>
      <Text style={styles.textDisplay}>Chiều Dài: {data.length}</Text>
      <Text style={styles.textDisplay}>Chiều Cao: {data.height}</Text>
      <Text style={styles.textDisplay}>Chiều Rộng: {data.width}</Text>
      <View style={styles.styleButton}>
        <TouchableOpacity
          style={[styles.buttonUpdate]}
          onPress={() => {
            navigation.navigate("UpdateTruck", {
              data: data,
            });
          }}
        >
          <Text style={{ fontSize: 18, color: "black" }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  detail: {
    borderRadius: 15,
    borderColor: "#000",
    backgroundColor: color.backgrounDisplayDetail,
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 20,
  },
  textDisplay: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInsert: {
    height: 45,
    backgroundColor: color.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginVertical: 30,
    alignContent: "center",
  },
  buttonDetail: {
    height: 45,
    backgroundColor: color.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginVertical: 10,
    marginLeft:30,
    alignContent: "center",
  },
  buttonUpdate: {
    marginTop:20,
    height: 45,
    borderColor: color.borderColor,
    borderWidth:2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginBottom: 30,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  textDisplayCode:{
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  }
});

export default DetailTruck