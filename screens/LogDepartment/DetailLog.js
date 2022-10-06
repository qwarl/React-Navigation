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
        <Text style={styles.textDisplayCode}>
          Mã Báo Giá: {data.quotationcode}
        </Text>
        <Text style={styles.textDisplay}>Tháng: {data.month}</Text>
        <Text style={styles.textDisplay}>Năm: {data.year}</Text>
        <Text style={styles.textDisplay}>Loại Vận Chuyển: {data.freight}</Text>
        <Text style={styles.textDisplay}>Tên Hàng: {data.name}</Text>
        <Text style={styles.textDisplay}>H/S Code: {data.hsCode}</Text>
        <Text style={styles.textDisplay}>Công Dụng: {data.function}</Text>
        <Text style={styles.textDisplay}>Cảng Đi: {data.pol}</Text>
        <Text style={styles.textDisplay}>Cảng Đến: {data.pod}</Text>
        <Text style={styles.textDisplay}>Loại Hàng: {data.typeProduct}</Text>
        <Text style={styles.textDisplay}>Số lượng: {data.quantity}</Text>
        <Text style={styles.textDisplay}>
          Yêu Cầu Đặc Biệt: {data.requirement}
        </Text>
        <Text style={styles.textDisplay}>Loại Hàng: {data.typeProduct}</Text>
        <Text style={styles.textDisplay}>Giá: {data.price}</Text>
        <Text style={styles.textDisplay}>Loại Hình: {data.type}</Text>
        <View>
          <Text style={styles.textDisplay}>Chính Sách: </Text>
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
        <Text style={styles.textDisplay}>Ghi Chú: {data.note}</Text>
        <View style={styles.styleButton}>
          <TouchableOpacity
            style={[styles.buttonUpdate]}
            onPress={() => {
              navigation.navigate("UpdateLog", {
                data: data,
              });
            }}
          >
            <Text style={{ fontSize: 18, color: "black" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
    marginLeft: 30,
    alignContent: "center",
  },
  buttonUpdate: {
    height: 45,
    backgroundColor: color.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    marginBottom: 30,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  textDisplayCode: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    marginRight: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
});

export default DetailLog;
