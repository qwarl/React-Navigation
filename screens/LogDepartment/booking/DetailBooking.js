import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import color from "../../../contains/color";

const DetailBooking = ({ navigation, route }) => {
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
          <Text style={styles.textDisplay}>Nhà Cung Cấp 1:</Text>
          <Text style={styles.textContent}>{data.supplier}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Nhà Cung Cấp 2:</Text>
          <Text style={styles.textContent}>{data.supplier1}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Nhà Cung Cấp 3:</Text>
          <Text style={styles.textContent}>{data.supplier2}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Cảng Đi:</Text>
          <Text style={styles.textContent}>{data.pol}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày Đi:</Text>
          <Text style={styles.textContent}>{data.daygo}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Cảng Đến:</Text>
          <Text style={styles.textContent}>{data.pod}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày Đến:</Text>
          <Text style={styles.textContent}>{data.dayarrive}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Sales Contract:</Text>
          <Text style={styles.textContent}>{data.salescontract}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày SalesContract:</Text>
          <Text style={styles.textContent}>{data.daysalescontract}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Invoice:</Text>
          <Text style={styles.textContent}>{data.invoice}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày Invoice:</Text>
          <Text style={styles.textContent}>{data.dayinvoice}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Packing:</Text>
          <Text style={styles.textContent}>{data.invoice}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày Packing:</Text>
          <Text style={styles.textContent}>{data.daypacking}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Số Bill/Booking:</Text>
          <Text style={styles.textContent}>{data.billbooking}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Ngày Bill/Booking:</Text>
          <Text style={styles.textContent}>{data.daybillbooking}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDisplay}>Debit Cho:</Text>
          <Text style={styles.textContent}>{data.debit}</Text>
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
              navigation.replace("ProfitReport", {
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

export default DetailBooking;
