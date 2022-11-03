import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import color from "../../contains/color";

const DetailLog = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.item);
  // console.log(data);

  const titlePolicy = data.policy.substring(0, 90);
  const referenceFee = data.referencefee.substring(0, 90);
  return (
    <ScrollView>
      <View style={styles.detail}>
        <Text style={styles.textDisplayCode}>{data.code}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Tháng:</Text>
          <Text style={styles.textContent}>{data.month}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Năm:</Text>
          <Text style={styles.textContent}>{data.year}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Vận Chuyển:</Text>
          <Text style={styles.textContent}>{data.freight}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Tên Hàng:</Text>
          <Text style={styles.textContent}>{data.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>H/S Code:</Text>
          <Text style={styles.textContent}>{data.hsCode}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Công Dụng:</Text>
          <Text style={styles.textContent}>{data.function}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Cảng Đi:</Text>
          <Text style={styles.textContent}>{data.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Cảng Đến:</Text>
          <Text style={styles.textContent}> {data.pod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Hàng:</Text>
          <Text style={styles.textContent}>{data.typeProduct}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Yêu Cầu Đặc Biệt:</Text>
          <Text style={styles.textContent}>{data.requirement}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Giá:</Text>
          <Text style={styles.textContent}>{data.price}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Hình:</Text>
          <Text style={styles.textContent}>{data.type}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Hàng:</Text>
          <Text style={styles.textContent}>{data.typeProduct}</Text>
        </View>
        <View>
          <Text style={styles.textDisplay}>Chính Sách:</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PolicyDetail", {
                data: data,
              });
            }}
          >
            <Text style={{ fontSize: 19, color: "black", marginLeft: 10 }}>
              {" "}
              {titlePolicy}... Đọc Thêm
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textDisplay}>Phí TTHQ Tham Khảo: </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PolicyDetail", {
                data: data,
              });
            }}
          >
            <Text style={{ fontSize: 19, color: "black", marginLeft: 10 }}>
              {" "}
              {referenceFee}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ghi Chú:</Text>
          <Text style={styles.textContent}>{data.note}</Text>
        </View>
        <View style={styles.styleButton}>
          <TouchableOpacity
            style={[styles.buttonUpdate]}
            onPress={() => {
              navigation.navigate("UpdateLog", {
                data: data,
              });
            }}
          >
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Cập nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonBooking]}
            onPress={() => {
              navigation.replace("AddBookingLog", {
                data: data,
              });
            }}
          >
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Tạo Thông Tin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 22,
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
    width: 160,
    marginBottom: 30,
    color: color.primary,
    marginRight: 10,
  },
  buttonBooking: {
    marginTop: 20,
    height: 45,
    borderColor: color.borderColor,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    marginBottom: 30,
    color: color.primary,
    marginLeft: 5,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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

export default DetailLog;
