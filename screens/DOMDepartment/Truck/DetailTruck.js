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
    <View style={{ backgroundColor: "white", width: "100%" }}>
      <ScrollView>
        <View style={styles.detail}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Tháng:</Text>
            <Text style={styles.textContent}>{data.month}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Châu:</Text>
            <Text style={styles.textContent}>{data.continent}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Loại Container:</Text>
            <Text style={styles.textContent}>{data.container}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Loại Xe:</Text>
            <Text style={styles.textContent}>{data.typetruck}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Tên Hàng:</Text>
            <Text style={styles.textContent}>{data.productname}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Trọng Lượng:</Text>
            <Text style={styles.textContent}>{data.weight}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>SL Kiện:</Text>
            <Text style={styles.textContent}>{data.quantitypallet}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>SL Carton:</Text>
            <Text style={styles.textContent}>{data.quantitycarton}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>ĐC Lấy Hàng:</Text>
            <Text style={styles.textContent}>{data.addressdelivery}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>ĐC Nhận Hàng:</Text>
            <Text style={styles.textContent}>{data.addressreceive}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Chiều Dài:</Text>
            <Text style={styles.textContent}>{data.length}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Chiều Cao:</Text>
            <Text style={styles.textContent}>{data.height}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textDisplay}>Chiều Rộng:</Text>
            <Text style={styles.textContent}>{data.width}</Text>
          </View>
          <View style={styles.styleButton}>
            <TouchableOpacity
              style={[styles.buttonUpdate]}
              onPress={() => {
                navigation.replace("UpdateTruck", {
                  data: data,
                });
              }}
            >
              <Text style={{ fontSize: 18, color: color.primary }}>
                Cập nhật
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: color.primary,
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 20,
  },
  textDisplay: {
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  textContent: {
    fontSize: 20,
    lineHeight: 25,
    marginRight: 4,
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
    marginLeft: 30,
    alignContent: "center",
  },
  buttonUpdate: {
    marginTop: 20,
    height: 45,
    borderColor: color.borderColor,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginBottom: 30,
    color: color.primary,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  textDisplayCode: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "center",
    color: color.primary,
    fontWeight: "bold",
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  textUpdate: {
    fontSize: 19,
    color: color.primary,
    fontWeight: "bold",
  },
});

export default DetailTruck;
