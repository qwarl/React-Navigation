import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const PaymentLog = () => {
  const fdate = new Date();
  let day = fdate.getDate();
  let month = fdate.getMonth() + 1;
  let year = fdate.getFullYear();

  return (
    <View style={{ marginTop: 30, flexDirection: "column" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>PHIẾU CHI</Text>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Ngày {day} Tháng {month} Năm {year}
        </Text>
      </View>
      <View style={{ position: "absolute", right: 10, top: 70 }}>
        <Text>Số:</Text>
        <Text>Nợ:</Text>
        <Text>Có:</Text>
      </View>
      <View style={{ marginTop: 90, marginLeft: 20 }}>
        <Text style={styles.textContent}>Họ tên người nộp tiền:</Text>
        <Text style={styles.textContent}>Địa Chỉ:</Text>
        <Text style={styles.textContent}>Lý do nộp:</Text>
        <Text style={styles.textContent}>Số tiền:</Text>
        <Text style={styles.textContent}>Viết bằng chữ:</Text>
        <Text style={styles.textContent}>
          Kèm theo:............... chứng từ gốc
        </Text>
      </View>
      <View style={{ position: "absolute", right: 10, top: 380 }}>
        <Text>Ngày......Tháng......Năm.......</Text>
      </View>
      <ScrollView
        // style={{
        //   flexDirection: "row",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   marginTop: 40,
        // }}
        horizontal={true}
        style={{ marginTop: 30 }}
      >
        <View>
          <Text
            style={{
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Giám đốc
          </Text>
          <Text>(Ký họ tên đóng dấu)</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Giám đốc
          </Text>
          <Text>(Ký họ tên đóng dấu)</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Giám đốc
          </Text>
          <Text>(Ký họ tên đóng dấu)</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Giám đốc
          </Text>
          <Text>(Ký họ tên đóng dấu)</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Giám đốc
          </Text>
          <Text>(Ký họ tên đóng dấu)</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentLog;

const styles = StyleSheet.create({
  textContent: {
    fontSize: 16,
    marginBottom: 15,
  },
});
