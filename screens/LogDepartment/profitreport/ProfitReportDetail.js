import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import color from "../../../contains/color";

const ProfitReportDetail = ({ route }) => {
  const [data, setData] = useState(route.params.item);
  return (
    <ScrollView>
      <View style={styles.detail}>
        <Text style={styles.textDisplayCode}>{data.idfile}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Mã Báo Giá:</Text>
          <Text style={styles.textContent}>{data.code}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Sales:</Text>
          <Text style={styles.textContent}>{data.sales}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Docs:</Text>
          <Text style={styles.textContent}>{data.docs}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>OPS:</Text>
          <Text style={styles.textContent}>{data.ops}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Khách Hàng:</Text>
          <Text style={styles.textContent}>{data.customer}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Hình:</Text>
          <Text style={styles.textContent}>{data.type}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Số Tờ Khai:</Text>
          <Text style={styles.textContent}>{data.numberdeclaration}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày Tờ Khai:</Text>
          <Text style={styles.textContent}>{data.daydeclaration}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Phân Luồng:</Text>
          <Text style={styles.textContent}>{data.stream}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Hàng:</Text>
          <Text style={styles.textContent}>{data.typeProduct}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Số Lượng:</Text>
          <Text style={styles.textContent}> {data.quantity}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Container:</Text>
          <Text style={styles.textContent}>{data.container}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Số Kiện:</Text>
          <Text style={styles.textContent}>{data.numberbale}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Loại Kiện:</Text>
          <Text style={styles.textContent}>{data.baletype}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Trọng Lượng:</Text>
          <Text style={styles.textContent}>{data.weight}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Số Container:</Text>
          <Text style={styles.textContent}>{data.numbercotainer}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Tên Hàng:</Text>
          <Text style={styles.textContent}>{data.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
          <Text style={styles.textDisplay}>Giá Bán:</Text>
          <Text style={styles.textContent}>{data.name}</Text>
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
              navigation.replace("UpdateBooking", {
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
            style={[styles.buttonUpdate]}
            onPress={() => {
              navigation.replace("UpdateBooking", {
                data: data,
              });
            }}
          >
            <Text
              style={{ fontSize: 18, color: color.primary, fontWeight: "bold" }}
            >
              Báo cáo lợi nhuận
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

export default ProfitReportDetail;
