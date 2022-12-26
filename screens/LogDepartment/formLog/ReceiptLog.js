import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const ReceiptLog = () => {
  const fdate = new Date();
  let day = fdate.getDate();
  let month = fdate.getMonth() + 1;
  let year = fdate.getFullYear();

  // dữ liệu tạo ảo do chưa có dữ liệu thật
  let number = 123;
  let indebt = 0;
  let has = 0;
  let name = "Nguyễn Văn A";
  let address = "Hồ Chí Minh";
  let reason = "Chi về phí làm hàng";
  let money = 123456;
  let writteninletters = "Một trăm hai mươi ba nghìn bốn trăm năm mươi sáu";
  let attach = 123;

  const html = `
     <html>
       <body>
         <h1 style="text-align: center;">Phiếu Thu</h1>
         <h2 style="text-align: center;">Ngày ${day} Tháng ${month} Năm ${year}</h2>
         <p style ="text-align: right;">Số: ${number}</p>
         <p style ="text-align: right;">Nợ: ${indebt}</p>
         <p style ="text-align: right;">Có: ${has}</p>
         <p>Họ tên người nộp tiền: ${name}</p>
         <p>Địa chỉ: ${address}</p>
         <p>Lý do nộp: ${reason}</p>
         <p>Số tiền: ${money}</p>
         <p>Viết bằng chữ: ${writteninletters}</p>
         <p>Kèm theo: ${attach} chứng từ gốc</p>
         <p style ="text-align: right;">Ngày......Tháng......Năm......</p>
         <div class="city">
  <h2>Tokyo</h2>
  <p>Tokyo is the capital of Japan.</p>
</div>
       </body>
     </html>
   `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };
  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <Pressable style={{ backgroundColor: "#fd5c63" }} onPress={generatePdf}>
          <Text
            style={{
              position: "absolute",
              right: 10,
              marginTop: 30,
              backgroundColor: "#fd5c63",
              padding: 8,
              borderRadius: 7,
              color: "white",
              marginBottom: 10,
              width: 120,
              textAlign: "center",
              fontSize: 17,
            }}
          >
            Xuất file pdf
          </Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 30, flexDirection: "column" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>PHIẾU THU</Text>
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
    </View>
  );
};

export default ReceiptLog;

const styles = StyleSheet.create({
  textContent: {
    fontSize: 16,
    marginBottom: 15,
  },
});
